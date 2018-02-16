function FruitService() {
    var url = 'https://inspire-server.herokuapp.com/api/mwm-fruits'
    var localFruits = []

    function Fruit(formData) {
        this.name = formData.name.value;
        this.color = formData.color.value;
        this.size = formData.size.value;
        this.tang = formData.tang.value;
    }

    this.getFruit = function getFruit(cb) {
        $.get(url)
            .then(function(fruits) {
                localFruits = fruits
                cb(localFruits)
            })
    }

    this.makeFruit = function(formData, cb) {
        var fruit = new Fruit(formData)
        $.post(url, fruit)
            .then(res => {
                localFruits.unshift(res.data)
                cb(localFruits)
            })
    }

    this.editFruit = function editFruit(formData, cb) {
        $.ajax({
                url: url + '/' + formData.id.value,
                method: 'PUT',
                data: new Fruit(formData)
            })
            .then(res => {
                this.getFruits(cb)
            })
    }

    this.removeFruit = function removeFruit(id, cb) {
        $.ajax({
                url: url + '/' + id,
                method: 'DELETE'
            })
            .then(res => {
                this.getFruit(cb)
            })
    }
}