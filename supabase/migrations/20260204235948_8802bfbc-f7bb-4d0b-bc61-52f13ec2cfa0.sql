-- Corregir search_path en funciones que no lo tienen
ALTER FUNCTION public.update_updated_at() SET search_path = public;