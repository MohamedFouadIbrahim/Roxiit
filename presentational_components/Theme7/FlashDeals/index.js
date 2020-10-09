import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import Product from '../../../partial_components/Theme7/Product';

export default class FlashDeals extends Component {
	renderFlashDeal = ({ item, index }) => {
		return (
			<Product
				navigation={this.props.navigation}
				pushNavigation={true}
				item={item}
				index={index}

			/>
		)
	}

	render() {
		const {
			pagePadding,
			mainScreen,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					mainScreen={mainScreen}
					title={"FlashDeals"}
					leftComponent="drawer" />

				<RemoteDataContainer
					url={"Offers/flash"}
					keyExtractor={({ Id }) => `${Id}`}
					numColumns={2}
					contentContainerStyle={{
						paddingVertical: pagePadding,
					}}
					ItemSeparatorComponent={
						() => <View style={{ height: 10, backgroundColor: 'transparent' }} />
					}
					renderItem={this.renderFlashDeal} />

			</LazyContainer>
		)
	}
}