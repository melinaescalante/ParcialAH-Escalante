const Brand = require('../models/BrandModel')


const createBrand = async (req, res) => {
    const { name, description, country } = req.body
    if (!name || !description || !country) {
        res.status(400).json({ msg: "Faltan paramteros obligatorios", data: { name, description, country } })
    }
    try {
        const brand = new Brand({ name, description, country})
        await brand.save();
        res.status(200).json({ msg: 'Marca creada', data: brand })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Ha ocurrido un error', data: {} })

    }
}
const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find()
        res.status(200).json({ msg: 'Ok', data: brands })
    } catch (error) {
        res.status(500).json({ msg: 'Ha ocurrido un error, no se pudo traer todos las marcas.' })

    }
}
const getBrandById = async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brand.findById(id)
        if (brand) {
            res.status(200).json({ msg: 'Marca encontrada', data: {brand} })
        } else {
            res.status(404).json({ msg: 'Marca no existente', data: {} })
        }
    } catch (error) {
        res.status(500).json({ msg: 'Ha ocurrido un error, no se ha podido buscar por id.', data: {} })

    }
}
const deleteBrandById = async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brand.findByIdAndDelete(id)
        if (brand) {
            res.status(200).json({ msg: 'Marca eliminada', data: {} })
        } else {
            res.status(404).json({ msg: 'Marca no existente', data: {} })
        }
    } catch (error) {
        res.status(500).json({ msg: 'Ha ocurrido un error, no se ha podido eliminar por id.', data: {} })

    }
}
const updateBrandById = async (req, res) => {
    const { id } = req.params;
    const { name, description,country } = req.body;
    try {
        const brand = await Brand.findByIdAndUpdate(id,{ name, description, country},{new:true})
        if (brand) {
            res.status(200).json({ msg: 'Marca actualizada', data: {brand} })
        } else {
            res.status(404).json({ msg: 'Marca no existe, no es posible actualizar', data: {} })
        }
    } catch (error) {
        res.status(500).json({ msg: 'Ha ocurrido un error, no se ha podido actualizar por id.', data: {} })

    }
}
module.exports = { createBrand, getBrands, getBrandById, deleteBrandById, updateBrandById }