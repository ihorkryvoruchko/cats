import {getAllDistricts, createDistrict} from '../repository/district.repository.js'

export async function fetchAllDistricts() {
  const districts = await getAllDistricts()

  return districts
}

export async function saveDistrict(districtData) {
  const newDistrict = await createDistrict(districtData)

  return newDistrict
}