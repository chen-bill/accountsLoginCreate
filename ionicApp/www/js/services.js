angular.module('starter')
.factory('accountInfo', function($firebaseObject, $http){
	var refProfile = new Firebase('https://glowing-inferno-581.firebaseio.com/' + '08bbecf3-e651-4e12-9760-71e962d6e2cf');
	var profile;

	return {
		setUserProfile: function(userId, callback){
			console.log('Setting user profile');
			$http.get("https://glowing-inferno-581.firebaseio.com/profiles/" + userId + ".json").then(function(response){
				profile = response.data;
				callback ("profile successfully added");
			})
		},
		getProfile: function(){
			return profile;
		}
	}
});