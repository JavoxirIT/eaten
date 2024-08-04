import { lazy, useEffect } from "react";
import { useRoutes } from "react-router-dom";
// import { useAllBooking } from "Store/Booking/useAllBooking";
import { useAllListing } from "Store/Listing/useAllListing";
import { useCitiesAndDistrict } from "Store/CitiesAndDistricts/useCitiesAndDistrict";
// import { usePriority } from "Store/Priority/usePriority";
import { useListingStatus } from "Store/ListingStatus/useListingStatus";
import { useUnit } from "Store/unit/useUnit";
import { useFoodType } from "Store/FoodType/useFoodType";
import { useCategory } from "Store/Category/useCategory";
import { useListingType } from "Store/ListingType/useListingType";
import { useConvenience } from "Store/Convenience/useConvenience";
import { useUserVender } from "Store/UserVenders/useUserVender";
import AdminLayout from "Layyouts/AdminLayout";
import IndexPage from "Pages/Index/IndexPage";
import Category from "Pages/Category/Catrgory";
import FoodType from "Pages/FoodType/FoodType";
import ListingType from "Pages/ListingType/ListingType";
import Convenience from "Pages/Convenience/Convenience";
import UserVender from "Pages/UserVender/UserVender";
import Error404 from "Components/404/Error404";
import { OneListings } from "Components/listing/OneListings";


const FoodClass = lazy(() => import("Pages/FoodClass/FoodClass"))
const Disput = lazy(() => import("Pages/Disput/Disput"));
const AllUsers = lazy(() => import("Pages/Users/AllUsers"));
const Listing = lazy(() => import("Pages/Listing/Listing"));
const AllBooking = lazy(() => import("Pages/Booking/AllBooking"));
const ListingStatus = lazy(() =>
	import("Components/listingStatus/ListingStatus")
);
// const Priority = lazy(() => import("Pages/priority/Priority"));
const UnitList = lazy(() => import("Components/unit/UnitList"));

export function Router() {
	// const { getBooking } = useAllBooking();
	const { getListing } = useAllListing();
	const { getСities, getDistrict } = useCitiesAndDistrict();
	// const { getPriority } = usePriority();
	const { getListingStatus } = useListingStatus();
	const { getUnit } = useUnit();
	const { getFoodType } = useFoodType();
	const { getCategory } = useCategory();
	const { getLidtingType } = useListingType();
	const { getConvenience } = useConvenience();
	const { getUserVender } = useUserVender();

	useEffect(() => {
		// getBooking();
		getListing();
		getСities();
		getDistrict();
		getUnit();
		// getPriority();
		getListingStatus();
		getFoodType();
		getCategory();
		getLidtingType();
		getConvenience();
		getUserVender();
		// eslint-disable-next-line
	}, []);

	return useRoutes([
		{
			path: "/",
			element: <AdminLayout />,
			children: [
				{
					element: <IndexPage />,
					index: true,
				},
				{
					path: "/users",
					element: <AllUsers />,
				},
				// {
				// 	path: "/booking",
				// 	element: <AllBooking />,
				// },
				{
					path: "/all-listing",
					element: <Listing />,
				},
				{
					path: "/all-listing/:id",
					element: <OneListings />,
				},
				// {
				// 	path: "priority",
				// 	element: <Priority />,
				// },
				{
					path: "listingStatus",
					element: <ListingStatus />,
				},
				{
					path: "listingType",
					element: <ListingType />,
				},
				{
					path: "unitList",
					element: <UnitList />,
				},
				{
					path: "foodType",
					element: <FoodType />,
				},
				{
					path: "category",
					element: <Category />,
				},
				{
					path: "convenience",
					element: <Convenience />,
				},
				{
					path: "userVender",
					element: <UserVender />,
				},
				{
					path: "disput",
					element: <Disput />,
				},
				{
					path: "foodClass",
					element: <FoodClass />,
				},
			],
		},
		{
			path: "*",
			element: <Error404 />,
		},
		// {
		// 	path: "/login",
		// 	element: <LoginLayout />,
		// },
	]);
}
