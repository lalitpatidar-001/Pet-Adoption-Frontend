export const handleCreatePostValidation = (data,image,isNoFeeChecked)=>{
    let errors = {};

    if(!data.name){
        errors.name="Pet name can not be empty";
    }

    if(!data.type){
        errors.type="Pet type can not be empty";
    }

    if(!data.breed){
        errors.breed="Breed can not be empty";
    }
    if(!data.age){
        errors.age="age can not be empty";
    }
    if(!image){
        errors.image="Image can not be empty";
    }
    if(!data.price && !isNoFeeChecked){
        errors.price="Choose one option price or no fee";
    }else if(data.price<=0 && !isNoFeeChecked){
        errors.price="price can not be less than 1 "
    }

return errors;

}