import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Palette } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

interface Props {
  studio: Tables<"studios">;
}

export const StudioCard = ({ studio }: Props) => (
  <Link to={`/dashboard/studio/${studio.id}`}>
    <Card className="hover:shadow-elevated transition-shadow cursor-pointer group">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {studio.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{studio.address}</span>
        </div>
        {studio.art_categories && studio.art_categories.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Palette className="h-4 w-4 text-muted-foreground" />
            {studio.art_categories.slice(0, 3).map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
        )}
        {studio.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {studio.description}
          </p>
        )}
      </CardContent>
    </Card>
  </Link>
);
