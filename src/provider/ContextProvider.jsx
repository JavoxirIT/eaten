import React from 'react'
import { CategoryState } from 'Store/Category/CategoryState'
import { SitiesAndDistrictState } from 'Store/CitiesAndDistricts/CitiesAndDistrict'
import { ConvenienceState } from 'Store/Convenience/ConvenienceState'
import { DisputState } from 'Store/Disput/DisputState'
import { FoodTypeState } from 'Store/FoodType/FoodTypeState'
import { FoodClassState } from 'Store/FoofClass/FoodClassState'
import { AllListingState } from 'Store/Listing/AllListingState'
import { ListingStatusState } from 'Store/ListingStatus/ListingStatusState'
import { ListingTypeState } from 'Store/ListingType/ListingTypeState'
import { UserVenderState } from 'Store/UserVenders/UserVenderState'
import { UnitState } from 'Store/unit/UnitState'
import CategoryBlockState from 'Store/СategoryBlock/CategoryBlockState'
import WebSiteTextState from 'Store/WebSiteText/WebSiteTextState'

export default function ContextProvider({ children }) {
	return <UserVenderState>
		<ConvenienceState>
			<ListingTypeState>
				<CategoryState>
					<FoodTypeState>
						<ListingStatusState>
							<UnitState>
								<SitiesAndDistrictState>
									<AllListingState>
										<DisputState>
											<FoodClassState>
												<CategoryBlockState>
													<WebSiteTextState>
														{children}
													</WebSiteTextState>
												</CategoryBlockState>
											</FoodClassState>
										</DisputState>
									</AllListingState>
								</SitiesAndDistrictState>
							</UnitState>
						</ListingStatusState>
					</FoodTypeState>
				</CategoryState>
			</ListingTypeState>
		</ConvenienceState>
	</UserVenderState>
}
