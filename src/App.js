import { AuthProvider } from "react-auth-kit";
import { AllListingState } from "./Store/Listing/AllListingState";
import { SitiesAndDistrictState } from "./Store/CitiesAndDistricts/CitiesAndDistrict";
import { BookingState } from "./Store/Booking/BookingState";
import { UnitState } from "./Store/unit/UnitState";
import { Router } from "./Router/Router";
import { PriorityState } from "./Store/Priority/PriorityState";
import { ListingStatusState } from "./Store/ListingStatus/ListingStatusState";
import { FoodTypeState } from "Store/FoodType/FoodTypeState";
import { CategoryState } from "Store/Category/CategoryState";
import "leaflet/dist/leaflet.css";
import { ListingTypeState } from "Store/ListingType/ListingTypeState";

export default function App() {
  return (
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <ListingTypeState>
        <CategoryState>
          <FoodTypeState>
            <ListingStatusState>
              <PriorityState>
                <UnitState>
                  <SitiesAndDistrictState>
                    <AllListingState>
                      <BookingState>
                        <Router />
                      </BookingState>
                    </AllListingState>
                  </SitiesAndDistrictState>
                </UnitState>
              </PriorityState>
            </ListingStatusState>
          </FoodTypeState>
        </CategoryState>
      </ListingTypeState>
    </AuthProvider>
  );
}
