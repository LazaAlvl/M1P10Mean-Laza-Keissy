const { json } = require('express');
const Service = require('../models/serviceModel');


module.exports.GetService = async (req, res, next) => {
    try {
        const services = await Service.find();
        console.log(services);
        return res.json(services);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.CreateService = async (req, res, next) => {
    const { name, price} = req.body;
    try{  
    const service = new Service({
        name,
        price
    });
    await service.save();
    return res.status(200).json('service register successfully');

} catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports.UpdateService = async (req, res, next) => {
    try {
        console.log('eto eee');
        const service = await Service.findById(req.params.id);
        // console.log(json(service));
        if(service){
            const update_service = await Service.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            );
            return res.status(200).json({ message: 'Service updated successfully'});
        }
        else{
            return res.status(404).json({ message: 'Service not found'});
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.DeleteService = async (req,res,next) => {
    try {
        const role_id= req.params.id;
        const service = await Service.findById(role_id); 
        
        if(service){
            const delete_service = await Service.findByIdAndDelete(role_id);
            return res.status(200).json({ message: 'Service deleted successfully'});
        }

        else{
            return res.status(404).json({ message: 'Service not found'});
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.getPaginatedServices= async (req, res, next) => {
      try {
        const services = await Service.find();


        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 8;
  
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const paginatedServices = services.slice(startIndex, endIndex);
        const totalPages = Math.ceil(services.length / pageSize);
  
        const paginatedResult = {
          services: paginatedServices,
          totalServices: services.length,
          totalPages: totalPages,
          currentPage: page
        };

        res.json(paginatedResult);

      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};
