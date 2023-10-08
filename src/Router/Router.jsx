import { lazy, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { useAllBooking } from "../Store/Booking/useAllBooking";
import { useAllListing } from "../Store/Listing/useAllListing";
import { useCitiesAndDistrict } from "../Store/CitiesAndDistricts/useCitiesAndDistrict";
import { usePriority } from "../Store/Priority/usePriority";
import { useListingStatus } from "../Store/ListingStatus/useListingStatus";
import { useUnit } from "../Store/unit/useUnit";
import AdminLayout from "../Layyouts/AdminLayout";
import Error404 from "../Components/404/Error404";
import LoginLayout from "../Layyouts/AuthLayout/LoginLayout";
import IndexPage from "../Pages/Index/IndexPage";

const AllUsers = lazy(() => import("../Pages/Users/AllUsers"));
const Listing = lazy(() => import("../Pages/Listing/Listing"));
const AllBooking = lazy(() => import("../Pages/Booking/AllBooking"));
const ListingStatus = lazy(() =>
  import("../Components/listingStatus/ListingStatus")
);
const Priority = lazy(() => import("../Pages/priority/Priority"));
const UnitList = lazy(() => import("../Components/unit/UnitList"));

export function Router() {
  const { getBooking } = useAllBooking();
  const { getListing } = useAllListing();
  const { getСities, getDistrict } = useCitiesAndDistrict();
  const { getPriority } = usePriority();
  const { getListingStatus } = useListingStatus();
  const { getUnit } = useUnit();
  useEffect(() => {
    getBooking();
    getListing();
    getСities();
    getDistrict();
    getUnit();
    getPriority();
    getListingStatus();
  }, []);

  return useRoutes([
    {
      path: "/",
      element: (
        <RequireAuth loginPath={"/login"}>
          <AdminLayout />
        </RequireAuth>
      ),
      children: [
        {
          element: <IndexPage />,
          index: true,
        },
        {
          path: "/users",
          element: <AllUsers />,
        },
        {
          path: "/booking",
          element: <AllBooking />,
        },
        {
          path: "/all-listing",
          element: <Listing />,
        },
        {
          path: "priority",
          element: <Priority />,
        },
        {
          path: "listingStatus",
          element: <ListingStatus />,
        },
        {
          path: "unitList",
          element: <UnitList />,
        },
      ],
    },
    {
      path: "*",
      element: <Error404 />,
    },
    {
      path: "/login",
      element: <LoginLayout />,
    },
  ]);
}
