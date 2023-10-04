import { useAllBooking } from "../../Store/Booking/useAllBooking";
import { MainTable } from "../../Components/MainTable/MainTable";

export default function AllBooking() {
  const { allBooking } = useAllBooking();
  console.log("allBooking", allBooking);
  return <></>;
}
