import { useAuctionDetail } from "../model/useAuctionDetail";
import { AuctionHeader } from "./AuctionHeader";
import { AuctionRoute } from "./AuctionRoute";
import { AuctionCargo } from "./AuctionCargo";
import { AuctionPayment } from "./AuctionPayment";
import { AuctionBetsHistory } from "./AuctionBetsHistory";
import { useBetsHistory } from "@/entities/bid";
import { Trading } from "@/widgets/trading";
import { Back } from "@/shared/ui";
import { Company } from "@/entities/company";
import { useParams } from "@tanstack/react-router";

export function AuctionDetail() {
  const { id } = useParams({ from: "/(pages)/auction/$id" });
  const { auction } = useAuctionDetail(id);
  const { bets } = useBetsHistory(id);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="flex flex-col gap-4">
        <Back to="/" title="На главную" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <AuctionHeader auction={auction} />
            <AuctionRoute routes={auction?.routes} />
            <AuctionCargo cargo={auction?.cargo} />
            <AuctionPayment payment={auction?.payment} />
            <AuctionBetsHistory id={id} bets={bets} />
          </div>

          <div className="flex flex-col gap-6">
            <Trading trading={auction?.trading} id={id} />
            <Company organizer={auction?.organizer} />
          </div>
        </div>
      </div>
    </div>
  );
}
