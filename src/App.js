import { AllListingState } from './Store/Listing/AllListingState';
import { SitiesAndDistrictState } from './Store/CitiesAndDistricts/CitiesAndDistrict';
// import { BookingState } from './Store/Booking/BookingState';
import { UnitState } from './Store/unit/UnitState';
// import { PriorityState } from './Store/Priority/PriorityState';
import { ListingStatusState } from './Store/ListingStatus/ListingStatusState';
import { FoodTypeState } from 'Store/FoodType/FoodTypeState';
import { CategoryState } from 'Store/Category/CategoryState';
import { ListingTypeState } from 'Store/ListingType/ListingTypeState';
import { ConvenienceState } from 'Store/Convenience/ConvenienceState';
import { UserVenderState } from 'Store/UserVenders/UserVenderState';
import { Router } from 'Router/Router';
import DisputState from 'Store/Disput/DisputState';
import FoodClassState from 'Store/FoofClass/FoodClassState';
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <UserVenderState>
      <ConvenienceState>
        <ListingTypeState>
          <CategoryState>
            <FoodTypeState>
              <ListingStatusState>
                {/* <PriorityState> */}
                <UnitState>
                  <SitiesAndDistrictState>
                    <AllListingState>
                      {/* <BookingState> */}
                      <DisputState>
                        <FoodClassState>
                          <Router />
                        </FoodClassState>
                      </DisputState>
                      {/* </BookingState> */}
                    </AllListingState>
                  </SitiesAndDistrictState>
                </UnitState>
                {/* </PriorityState> */}
              </ListingStatusState>
            </FoodTypeState>
          </CategoryState>
        </ListingTypeState>
      </ConvenienceState>
    </UserVenderState>
  );
}
