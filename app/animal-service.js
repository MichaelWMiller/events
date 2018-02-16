function AnimalService() {
    var url = 'https://inspire-server.herokuapp.com/api/mwm-animals'
    var localAnimals = []

    function Animal(formData) {
        this.name = formData.name.value;
        this.nbrLegs = formData.nbrLegs.value;
        this.speed = formData.speed.value;
        this.color = formData.color.value;
    }

    this.getAnimals = function getAnimals(cb) {
        $.get(url)
            .then(function(animals) {
                localAnimals = animals
                cb(localAnimals)
            })
    }

    this.makeAnimal = function(formData, cb) {
        var animal = new Animal(formData)
        $.post(url, animal)
            .then(res => {
                localAnimals.unshift(res.data)
                cb(localAnimals)
            })
    }

    this.editAnimal = function editAnimal(formData, cb) {
        $.ajax({
                url: url + '/' + formData.id.value,
                method: 'PUT',
                data: new Animal(formData)
            })
            .then(res => {
                this.getAnimals(cb)
            })
    }

    this.removeAnimal = function removeAnimal(id, cb) {
        $.ajax({
                url: url + '/' + id,
                method: 'DELETE'
            })
            .then(res => {
                this.getAnimal(cb)
            })
    }

}