export const GetOptionsPostModel = (options, checkout = false, onSuccess, onFailure) => {
	let PostOptions = []
	let RequiredUnselectedGroups = []

	options.forEach(item => {
		const isRequired = item.IsRequired && (item.ShowInProducts || checkout)

		switch (item.Type.Id) {
			case 1:
			case 2:
			case 3 /*icon*/:
				const itemSelectedOptions = item.Members.filter(filterItem => filterItem.isSelected).map(mapItem => ({
					ProductOptionId: mapItem.Id,
					ExtraDetails1: mapItem.value1,
					ExtraDetails2: mapItem.value2,
					ExtraDetails3: mapItem.value3,
				}))

				if (itemSelectedOptions.length) {
					PostOptions = [
						...PostOptions,
						...itemSelectedOptions
					]
				}
				else if (isRequired) {
					RequiredUnselectedGroups.push(item.Name)
				}
				break;
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10/* list */:
				if (item.AllowMultiple == false) {

					if (isRequired && item.Members.length > 0 && item.Members.filter(item => !item.IsHidden && !item.IsDisable).length > 0 &&
						item.Members.filter(item => item.isSelected).length == 0) {
						RequiredUnselectedGroups.push(item.Name)
					}
					else {

						const firstMember = item.Members.filter(item => item.isSelected)[0]
						if (firstMember) {
							const { Id, value1, value2, value3 } = firstMember
							PostOptions.push({
								ProductOptionId: Id,
								ExtraDetails1: value1,
								ExtraDetails2: value2,
								ExtraDetails3: value3,
							})
						}
					}
				}
				else {
					if (isRequired && item.Members.length > 0 && item.Members.filter(item => item.isSelected).length == 0 &&
						item.Members.filter(item => !item.IsHidden && !item.IsDisable).length > 0) {
						RequiredUnselectedGroups.push(item.Name)
					}
					else
						item.Members.filter(item => item.isSelected).forEach(EtchItem => {
							const { Id, value1, value2, value3 } = EtchItem

							PostOptions.push({
								ProductOptionId: Id,
								ExtraDetails1: value1,
								ExtraDetails2: value2,
								ExtraDetails3: value3,
							})
						})
				}
				break;
		}
	})

	if (RequiredUnselectedGroups.length) {
		onFailure && onFailure({
			required: RequiredUnselectedGroups
		})
	}
	else {
		onSuccess && onSuccess({
			model: PostOptions,
		})
	}
}

export const IsProductCheckoutEligible = (item) => {
	const {
		Status,
	} = item

	if (Status && Status.Id !== 6 && Status.Id !== 7 && Status.Id !== 8) {
		return true
	}
	else {
		return false
	}
}