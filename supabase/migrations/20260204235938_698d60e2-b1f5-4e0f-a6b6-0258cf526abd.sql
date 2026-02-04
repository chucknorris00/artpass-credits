-- =============================================
-- ARTPASS: Plataforma de Membresía de Talleres de Arte
-- =============================================

-- 1. ENUM para estados de reserva
CREATE TYPE public.booking_status AS ENUM ('booked', 'attended', 'cancelled');

-- 2. ENUM para roles de usuario
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 3. Tabla de planes de membresía
CREATE TABLE public.membership_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    credits_per_month INTEGER NOT NULL DEFAULT 0,
    price_cents INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Tabla de perfiles de usuario (users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    available_credits INTEGER NOT NULL DEFAULT 0,
    plan_id UUID REFERENCES public.membership_plans(id),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Tabla de roles de usuario
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 6. Tabla de historial de pagos
CREATE TABLE public.payment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    amount_cents INTEGER NOT NULL,
    credits_purchased INTEGER NOT NULL DEFAULT 0,
    payment_method TEXT,
    stripe_payment_id TEXT,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Tabla de estudios (studios)
CREATE TABLE public.studios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    photos TEXT[] DEFAULT '{}',
    art_categories TEXT[] DEFAULT '{}',
    phone TEXT,
    email TEXT,
    website TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Tabla de clases (classes)
CREATE TABLE public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    schedule TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    max_capacity INTEGER NOT NULL DEFAULT 10,
    credit_cost INTEGER NOT NULL DEFAULT 1,
    instructor_name TEXT,
    art_category TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Tabla de reservas (bookings)
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE NOT NULL,
    status booking_status NOT NULL DEFAULT 'booked',
    credits_used INTEGER NOT NULL DEFAULT 1,
    booked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    cancelled_at TIMESTAMPTZ,
    attended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, class_id)
);

-- =============================================
-- FUNCIONES HELPER
-- =============================================

-- Función para verificar roles (evita recursión en RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    )
$$;

-- Función para obtener créditos disponibles del usuario
CREATE OR REPLACE FUNCTION public.get_user_credits(_user_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT COALESCE(available_credits, 0)
    FROM public.profiles
    WHERE id = _user_id
$$;

-- Función para contar asistentes de una clase
CREATE OR REPLACE FUNCTION public.get_class_attendees_count(_class_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT COUNT(*)::INTEGER
    FROM public.bookings
    WHERE class_id = _class_id AND status = 'booked'
$$;

-- Función para crear reserva (transacción atómica)
CREATE OR REPLACE FUNCTION public.create_booking(
    _user_id UUID,
    _class_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    _user_credits INTEGER;
    _class_cost INTEGER;
    _class_capacity INTEGER;
    _current_attendees INTEGER;
    _booking_id UUID;
    _class_name TEXT;
BEGIN
    -- Obtener información de la clase
    SELECT credit_cost, max_capacity, name INTO _class_cost, _class_capacity, _class_name
    FROM public.classes
    WHERE id = _class_id AND is_active = true;
    
    IF _class_cost IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Clase no encontrada o inactiva');
    END IF;
    
    -- Verificar créditos del usuario
    SELECT available_credits INTO _user_credits
    FROM public.profiles
    WHERE id = _user_id
    FOR UPDATE;
    
    IF _user_credits IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Usuario no encontrado');
    END IF;
    
    IF _user_credits < _class_cost THEN
        RETURN json_build_object(
            'success', false, 
            'error', 'Créditos insuficientes',
            'credits_required', _class_cost,
            'credits_available', _user_credits
        );
    END IF;
    
    -- Verificar cupo disponible
    SELECT COUNT(*) INTO _current_attendees
    FROM public.bookings
    WHERE class_id = _class_id AND status = 'booked';
    
    IF _current_attendees >= _class_capacity THEN
        RETURN json_build_object(
            'success', false, 
            'error', 'No hay cupo disponible',
            'capacity', _class_capacity,
            'current_attendees', _current_attendees
        );
    END IF;
    
    -- Verificar que el usuario no tenga reserva existente
    IF EXISTS (SELECT 1 FROM public.bookings WHERE user_id = _user_id AND class_id = _class_id AND status = 'booked') THEN
        RETURN json_build_object('success', false, 'error', 'Ya tienes una reserva para esta clase');
    END IF;
    
    -- Restar créditos del usuario
    UPDATE public.profiles
    SET available_credits = available_credits - _class_cost,
        updated_at = now()
    WHERE id = _user_id;
    
    -- Crear la reserva
    INSERT INTO public.bookings (user_id, class_id, credits_used, status)
    VALUES (_user_id, _class_id, _class_cost, 'booked')
    RETURNING id INTO _booking_id;
    
    RETURN json_build_object(
        'success', true,
        'booking_id', _booking_id,
        'class_name', _class_name,
        'credits_used', _class_cost,
        'credits_remaining', _user_credits - _class_cost
    );
END;
$$;

-- Función para cancelar reserva y devolver créditos
CREATE OR REPLACE FUNCTION public.cancel_booking(_user_id UUID, _booking_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    _credits_to_refund INTEGER;
    _booking_user_id UUID;
BEGIN
    -- Obtener información de la reserva
    SELECT user_id, credits_used INTO _booking_user_id, _credits_to_refund
    FROM public.bookings
    WHERE id = _booking_id AND status = 'booked'
    FOR UPDATE;
    
    IF _booking_user_id IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Reserva no encontrada o ya cancelada');
    END IF;
    
    IF _booking_user_id != _user_id THEN
        RETURN json_build_object('success', false, 'error', 'No tienes permiso para cancelar esta reserva');
    END IF;
    
    -- Cancelar la reserva
    UPDATE public.bookings
    SET status = 'cancelled', cancelled_at = now(), updated_at = now()
    WHERE id = _booking_id;
    
    -- Devolver créditos al usuario
    UPDATE public.profiles
    SET available_credits = available_credits + _credits_to_refund,
        updated_at = now()
    WHERE id = _user_id;
    
    RETURN json_build_object(
        'success', true,
        'credits_refunded', _credits_to_refund
    );
END;
$$;

-- Trigger para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, available_credits)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        3 -- Créditos de bienvenida
    );
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Trigger para actualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_studios_updated_at BEFORE UPDATE ON public.studios
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =============================================
-- POLÍTICAS RLS (Row Level Security)
-- =============================================

-- Profiles: usuarios solo ven su propio perfil
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid());

-- User roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Payment history
ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payment history"
    ON public.payment_history FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Studios: públicos para todos
ALTER TABLE public.studios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Studios are publicly viewable"
    ON public.studios FOR SELECT
    TO authenticated
    USING (is_active = true);

CREATE POLICY "Admins can manage studios"
    ON public.studios FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- Membership plans: públicos
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plans are publicly viewable"
    ON public.membership_plans FOR SELECT
    TO authenticated
    USING (is_active = true);

-- Classes: públicas para ver
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Classes are publicly viewable"
    ON public.classes FOR SELECT
    TO authenticated
    USING (is_active = true);

CREATE POLICY "Admins can manage classes"
    ON public.classes FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- Bookings: usuarios solo ven sus propias reservas
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings"
    ON public.bookings FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can create their own bookings"
    ON public.bookings FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- =============================================
-- DATOS INICIALES
-- =============================================

-- Planes de membresía
INSERT INTO public.membership_plans (name, description, credits_per_month, price_cents) VALUES
    ('Básico', '4 clases al mes', 4, 2999),
    ('Estándar', '8 clases al mes', 8, 4999),
    ('Premium', '12 clases al mes + acceso ilimitado fines de semana', 12, 7999),
    ('Ilimitado', 'Clases ilimitadas', 99, 12999);

-- Estudios de ejemplo
INSERT INTO public.studios (name, description, address, latitude, longitude, art_categories, photos) VALUES
    ('Atelier Luna', 'Estudio de pintura y dibujo en el corazón de la ciudad', 'Calle Luna 42, Centro', 19.4326, -99.1332, ARRAY['Pintura', 'Dibujo', 'Acuarela'], ARRAY['https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800']),
    ('Cerámica del Sol', 'Taller especializado en cerámica y escultura', 'Av. Sol 123, Polanco', 19.4378, -99.1917, ARRAY['Cerámica', 'Escultura'], ARRAY['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800']),
    ('Studio Creativo', 'Espacio multidisciplinario para artistas', 'Calle Arte 78, Roma Norte', 19.4195, -99.1573, ARRAY['Pintura', 'Fotografía', 'Mixed Media'], ARRAY['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800']);