import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useStudios = () =>
  useQuery({
    queryKey: ["studios"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("studios")
        .select("*")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return data;
    },
  });

export const useStudio = (id: string) =>
  useQuery({
    queryKey: ["studios", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("studios")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

export const useClasses = (studioId?: string) =>
  useQuery({
    queryKey: ["classes", studioId],
    queryFn: async () => {
      let query = supabase
        .from("classes")
        .select("*, studios(name)")
        .eq("is_active", true)
        .order("name");
      if (studioId) query = query.eq("studio_id", studioId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

export const useBookings = (studioId?: string) =>
  useQuery({
    queryKey: ["bookings", studioId],
    queryFn: async () => {
      let query = supabase
        .from("bookings")
        .select("*, classes(name, studio_id, studios(name))")
        .order("booked_at", { ascending: false });
      // Filter by studio if provided - we filter after fetch since bookings don't have studio_id directly
      const { data, error } = await query;
      if (error) throw error;
      if (studioId) {
        return data.filter((b: any) => b.classes?.studio_id === studioId);
      }
      return data;
    },
  });

export const useProfiles = () =>
  useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, membership_plans(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
