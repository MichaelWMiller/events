function AnimalController() {
    var animalService = new AnimalService()
    var animalsElem = document.getElementById('animals-here')

    function getAnimals() {
        animalService.getAnimals(draw)
    }

    this.makeAnimal = function(event) {
        event.preventDefault()
        var form = event.target
        animalService.makeAnimal(form, draw)
        form.reset()
    }

    this.removeAnimal = function removeAnimal(id) {
        animalService.removeAnimal(id, draw)
    }

    this.showEditAnimalForm = function showEditAnimalForm(id) {
        var form = document.getElementById('edit-' + id)
        form.classList.remove('hidden')
    }

    this.editAnimal = function editAnimal(event) {
        event.preventDefault()
        animalService.editAnimal(event.target, draw)
    }

    function draw(animals) {
        var template = ``
        if (animals == undefined) {
            animalsElem.innerHTML = '<h4> Sorry... No Animals!</h4>'
            return
        } else if (animals.length < 1) {
            animalsElem.innerHTML = '<h4> Sorry... No Animals!</h4>'
            return
        }
        animals.forEach(animal => {
            template += `
            <div class="card p-1 flex space-between">
            <div class="details">
                <p>${animal.name} - ${animal.nbrLegs} - ${animal.speed} - ${animal.color}</p>
                <button onclick="app.controllers.animalCtrl.showEditAnimalForm('${animal.id}')" class="action fa fa-fw fa-lg fa-pencil text-blue">Edit</button>
                <button onclick="app.controllers.animalCtrl.removeAnimal('${animal.id}')" class="action fa fa-fw fa-lg fa-trash text-red">Remove</button>
            </div>
            <form id="edit-${animal.id}" class="hidden" onsubmit="app.controllers.animalCtrl.editAnimal(event)">
            <div class="form-group hidden">
                <label for="id">id:</label>
                <input type="text" name="id" class="form-control" required value="${animal.id}" readonly>
            </div>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" class="form-control" value="${animal.name}" required>
            </div>
            <div class="form-group">
                <label for="nbrLegs">Number of Legs:</label>
                <input type="number" name="nbrLegs" class="form-control" value="${animal.nbrLegs}" required>
            </div>
            <div class="form-group">
                <label for="speed">Size:</label>
                <input type="text" name="speed" class="form-control" value="${animal.speed}" required>
            </div>
            <div class="form-group">
                <label for="color">Color:</label>
                <input type="text" name="color" class="form-control" value="${animal.color}">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-success">Update Animal</button>
                <button type="reset" class="btn btn-danger red">Clear</button>
            </div>
        </form>
        </div>        
        `
        })
        animalElem.innerHTML = template
    }

    function hideOtherForms() {
        document.getElementById("autos").style.visibility = "hidden"
        document.getElementById("fruit").style.visibility = "hidden"

        document.getElementById("animals").style.visibility = "visible"
    }

    this.goAnimals = function goAnimals() {
        hideOtherForms()
        draw()
    }

    getAnimals()

}