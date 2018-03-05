var beerapp = angular.module('beerapp', []);

function testController($scope, $http) {
    $scope.beers = [
                    {
                        name: "Bud Light",
                        description: "Bud Light is brewed using a blend of premium aroma hop varieties, both American-grown and imported, and a combination of barley malts and rice. Its superior drinkability and refreshing flavor makes it the world’s favorite light beer."
                    },{
                        name: "Coors Light",
                        description: "No Description"
                    },{
                        name: "Budweiser",
                        description: "Brewed using a blend of imported and classic American aroma hops, and a blend of barley malts and rice. Budweiser is brewed with time-honored methods including “kraeusening” for natural carbonation and Beechwood aging, which results in unparalleled balance and character."
                    },{
                        name: "Miller Light",
                        description: "No Description"
                    },{
                        name: "Corona",
                        description: "No Description"
                    },{
                        name: "Natural Light",
                        description: "Natural Light is brewed with a blend of premium American and imported hops, and a combination of malt and corn. Its longer brewing process produces a lighter body, fewer calories and an easy-drinking character."
                    },{
                        name: "Yuengling Lager",
                        description: "No Description"
                    }

    ];
}
