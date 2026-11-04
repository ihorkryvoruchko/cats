import {fetchAllDistricts, saveDistrict} from '../service/district.service.js'

export async function getDistricts(req, res) {
  const districts = await fetchAllDistricts()

  res.status(200).json(districts)
}

export async function createDistrict(req, res) {
  const newDistrict = await saveDistrict(req.body)

  res.status(201).json(newDistrict)
}
