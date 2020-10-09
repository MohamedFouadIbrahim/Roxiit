const navigateToCategory = (navigation, item, pushNavigation) => {
	const {
		Id,
		Name,
		ShowProductsWithChildren,
	} = item

	const navigationParams = {
		Id,
		Name,
		ShowProductsWithChildren,
		item
	}

	if (pushNavigation) {
		navigation.push('Category', navigationParams)
	}
	else {
		navigation.navigate('Category', navigationParams)
	}
}

export const onPressCategory = (navigation, item, category_route, pushNavigation) => {
	const {
		hasChildren,
		Id,
		Name,
		ShowProductsWithChildren,
	} = item

	if (hasChildren) {
		if (ShowProductsWithChildren) {
			navigateToCategory(navigation, item)
		}
		else {
			const routeName = category_route || "Categories"

			navigation.push(routeName, {
				screen: routeName,
				Id,
				Name,
				item,
				params: {
					Id,
					Name,
					item,
				},
			})
		}
	}
	else {
		navigateToCategory(navigation, item, pushNavigation)
	}
}