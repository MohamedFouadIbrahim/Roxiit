import React from 'react';
import PopupsSlider from '../partial_components/Theme26/PopupsSlider';
import { store } from '../App';

export const PopupsListProps = (TopPopups = [], BottomPopups = [], conditionToShowHeader = true, conditionToShowFooter = true, headerSliderName, footerSliderName, TopPopupsProp = {}, BottomPopupsProps = {},
    customBottomMarginForTopAds = null, customTopMarginForBottomAds = null,) => {

    let headerProps = {}
    let footerProps = {}
    const haveHeader = TopPopups && TopPopups.length > 0 && conditionToShowHeader;
    const haveFooter = BottomPopups && BottomPopups.length > 0 && conditionToShowFooter;
    const pagePadding = store.getState().runtime_config.runtime_config.styles.pagePadding

    if (haveHeader) {
        headerProps = {
            ListHeaderComponent: () => {
                return (
                    <PopupsSlider
                        name={headerSliderName}
                        top={true}
                        DisableInternalPadding={true}
                        images={TopPopups}
                        contentContainerStyle={{
                            marginBottom: customBottomMarginForTopAds ?? pagePadding * 2.6,
                        }}
                        {...TopPopupsProp}
                    />
                )
            }
        }
    }

    if (haveFooter) {
        footerProps = {
            ListFooterComponent: () => {
                return (
                    <PopupsSlider
                        name={footerSliderName}
                        images={BottomPopups}
                        DisableInternalPadding={true}
                        contentContainerStyle={{
                            marginTop: customTopMarginForBottomAds ?? pagePadding * 2.6,
                        }}
                        {...BottomPopupsProps}
                    />
                )
            }
        }
    }

    return {
        ...headerProps,
        ...footerProps
    }
}
