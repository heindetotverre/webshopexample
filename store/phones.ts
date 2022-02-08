import { reactive, readonly, } from "vue"
import { Phone, Sort } from "~~/types"

// externals
const initialState = {
  activeFilters: {},
  phones: [] as Array<Phone>,
  filters: [] as Array<any>,
  filteredPhones: [] as Array<Phone>
}

const state = reactive({
  ...initialState
})

const fetchPhoneList = async () => {
  try {
    const { data } = await useAsyncData('fetchedPhones', async () => $fetch('/api/allPhones'))
    if (data.value.message === 'AllPhonesFetched') {
      const phones = data.value.phones as Array<Phone>
      state.phones = phones
      state.filteredPhones = phones
      createFilters()
    } else {
      throw new Error(data.value.message)
    }
  } catch (error) {
    // send to some error endpoint
    console.log(error)
  }
}

const filter = (filter) => {
  if (filter === 'reset') {
    state.activeFilters = {}
    filterPhones()
    return
  }
  // if filter categrory hasnt been set yet
  if (!state.activeFilters[filter.key]?.length) {
    state.activeFilters[filter.key] = []
  }
  // push new filter
  state.activeFilters[filter.key].push(filter.value)
  // delete filter if already exusts
  if (state.activeFilters[filter.key].filter(f => f === filter.value).length > 1) {
    state.activeFilters[filter.key] = state.activeFilters[filter.key].filter(f => f !== filter.value)
  }
  // delete filter category
  if (!state.activeFilters[filter.key].length) {
    delete state.activeFilters[filter.key]
  }

  filterPhones()
}

const setPhonesArray = (phones) => {
  state.filteredPhones = phones
}

const sort = (sortBy) => {
  let sortedPhones = []
  if (sortBy === Sort.Action) {
    sortedPhones = state.filteredPhones.filter(p => p.has_promotion === true).concat(state.phones.filter(p => p.has_promotion !== true))
  }
  if (sortBy === Sort.Most) {
    sortedPhones = state.filteredPhones.sort((a, b) => a.sort_order - b.sort_order)
  }
  if (sortBy === Sort.New) {
    sortedPhones = state.filteredPhones.sort((a, b) => {
      return a.release_date.toLowerCase() < b.release_date.toLowerCase()
        ? -1
        : a.release_date.toLowerCase() > b.release_date.toLowerCase()
          ? 1
          : 0
    })
    state.filteredPhones = sortedPhones
  }
}

const getActiveFilters = () => {
  return state.activeFilters
}

const getFilters = () => {
  return state.filters
}

const getFilteredPhoneList = () => {
  return state.filteredPhones
}

const getPhoneList = () => {
  return state.phones
}

// exports
export const phoneStore = readonly({
  state: state,
  do: {
    fetchPhoneList,
    filter,
    sort
  },
  get: {
    getActiveFilters,
    getFilters,
    getPhoneList,
    getFilteredPhoneList
  }
})

// internals
const createFilters = () => {
  const createUniqueFilterValues = (title, filterKey) => {
    const mapped = state.phones.map(p => p[filterKey])
    return {
      title: title,
      filteredItems: createUniques(mapped),
      filterKey: filterKey
    }
  }

  const createColors = (title) => {
    let colors = []
    for (const phone of state.phones) {
      colors = [...colors, ...phone.colors]
    }
    return {
      title: title,
      filteredItems: createUniques(colors),
      filterKey: 'colors'
    }
  }

  state.filters = [
    createUniqueFilterValues('Merk', 'manufacturer'),
    createColors('Kleur'),
    createUniqueFilterValues('5G', 'has_5g'),
    createUniqueFilterValues('Besturingssyteem', 'operating_system'),
    createUniqueFilterValues('E-Sim', 'has_esim'),
    createUniqueFilterValues('Refurbished', 'refurbished')
  ]
}

const createUniques = (array) => {
  return array.filter((item, index) => {
    return array.indexOf(item) == index
  })
}

const filterPhones = () => {
  const filteredPhonesAddedPerCategory = []
  const activeFilterCategories = Object.entries(state.activeFilters)

  Object.entries(state.activeFilters).forEach((filterCategory) => {
    (filterCategory[1] as Array<any>).forEach((filter) => {
      const filteredPhones = filterCategory[0] !== 'colors'
        ? state.phones.filter(p => p[filterCategory[0]] === filter)
        : state.phones.filter(p => p[filterCategory[0]].includes(filter))
      filteredPhonesAddedPerCategory.push(...filteredPhones)
      setPhonesArray(filteredPhonesAddedPerCategory)
    })
  })
  if (!activeFilterCategories.length) {
    setPhonesArray(state.phones)
  }
  if (activeFilterCategories.length > 1) {

  }
}