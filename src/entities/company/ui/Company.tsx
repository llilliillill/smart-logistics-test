import { Building2, Phone } from "lucide-react";
import type { AuctionOrganizer } from "@/entities/auction";

interface CompanyProps {
  organizer: AuctionOrganizer;
}

export function Company({ organizer }: CompanyProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Building2 className="h-4 w-4 text-primary" /> Организатор
      </h2>

      <div className="flex flex-col gap-2 text-xs">
        <div className="text-sm font-semibold text-foreground">
          {organizer?.organization_name || "Не указан"}
        </div>

        {organizer?.is_hide_organization ? (
          <div className="mt-2 rounded-lg bg-muted p-2.5 text-muted-foreground italic">
            Контакты организатора скрыты до заключения сделки
          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3 text-muted-foreground">
            {organizer?.organization_inn && (
              <a
                href={`tel:${organizer?.organization_inn}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{organizer?.organization_inn}</span>
              </a>
            )}
            {!organizer?.organization_inn && !organizer?.organization_kpp && (
              <span className="italic text-muted-foreground">
                Контакты не указаны
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
