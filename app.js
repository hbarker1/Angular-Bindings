angular.module("mainApp", [])

.component("outerComp", {
    bindings: {
        username: '@' //string binding
    },
    controller: [function(){
        var $ctrl = this;
        $ctrl.$onInit = function() {
            //evaluates what's in here before the page loads/displays
            $ctrl.username = $ctrl.username || "NA";
        };
        $ctrl.addName = function(name) {
            $ctrl.username = name;
        };
    }],
    template:
    `<h2>Hello, from the outer component</h2>
    <p>Username is: {{$ctrl.username}}</p>
    <inner-comp add-name="$ctrl.addName(emptyname)"><inner-comp>
    `
})

.component("innerComp", {
    bindings: {
        addName: '&' //function binding
    },
    controller: [function(){
        var $ctrl = this;

        $ctrl.addName = function (){
            $ctrl.addName({emptyname: $ctrl.newName});
            $ctrl.newName = '';
        };
    }],
    template:
    `<h3>Hello, from the inner component</h3>
    <p><input ng-model="$ctrl.newName" /></p>
    <p><button ng-click="$ctrl.addName()">Add Name</button></p>
    `
});