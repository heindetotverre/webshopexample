import { reactive, readonly, } from "vue"
import { Phone, Sort } from "~~/types"

// externals
const initialState = {
  activeFilters: {} as any,
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
    if (data?.value?.message === 'AllPhonesFetched') {
      const phones = data?.value?.phones as Array<Phone>
      state.phones = phones
      state.filteredPhones = phones
      createFilters()
    } else {
      throw new Error(data?.value?.message)
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
  if (!state.activeFilters[filter.key]?.length) {
    state.activeFilters[filter.key] = []
  }
  state.activeFilters[filter.key].push(filter.value)
  if (state.activeFilters[filter.key].filter(f => f === filter.value).length > 1) {
    state.activeFilters[filter.key] = state.activeFilters[filter.key].filter(f => f !== filter.value)
  }
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
      return a.release_date.localeCompare(b.release_date)
    }).reverse()
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

  const createColors = (title, filterKey) => {
    let colors = []
    for (const phone of state.phones) {
      colors = [...colors, ...phone.colors]
    }
    return {
      title: title,
      filteredItems: createUniques(colors),
      filterKey: filterKey
    }
  }

  state.filters = [
    createUniqueFilterValues('Merk', 'manufacturer'),
    createColors('Kleur', 'colors'),
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
  let totalFilteredPhones = []
  Object.keys(state.activeFilters).forEach((key) => {
    if (key === 'manufacturer') {
      state.activeFilters.manufacturer.forEach((filter) => {
        const filteredPhones = state.phones.filter(p => p.manufacturer === filter)
        totalFilteredPhones.push(...filteredPhones)
      })
      return
    }
    if (key === 'colors') {
      state.activeFilters.colors.forEach((filter) => {
        const filteredPhones = state.filteredPhones.filter(p => p.colors.includes(filter))
        totalFilteredPhones = filteredPhones
      })
      return
    }
    state.activeFilters[key].forEach((filter) => {
      const filteredPhones = state.filteredPhones.filter(p => p[key] === filter)
      totalFilteredPhones = filteredPhones
    })
  })
  setPhonesArray(totalFilteredPhones)
  if (!Object.keys(state.activeFilters).length) {
    setPhonesArray(state.phones)
  }
}