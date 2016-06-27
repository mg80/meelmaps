/* TODO: write some nice stuff
*
*
*
* */

function mm() {
	var mm = {};
	mm.init = function () {
		var db = this.db = new PouchDB('http://127.0.0.1:5984/mm');
		db.get('markers').catch(function (err) {
			if (err.name === 'not_found')
				return this.db.put({_id: 'markers', markers: {}});
			else
				throw err;
		}.bind(this));
		return db;
	};

	mm.addLocation = function (location, displayValue) {
		mm.init().then(function (db) {
			db.get('markers').then(function (doc) {
				doc.markers[location] = {
					displayValue: displayValue,
					date: '', //TODO
					description: '', //TODO
					tags: '', //TODO
					people: '', //TODO
					photos: '' //TODO
				};
				db.put(doc);
			});
		});
	};

	mm.getLocations = function () {
		return new Promise(function (resolve, reject) {
			mm.init().then(function (db) {
				db.get('markers').then(function (doc) {
					resolve(doc.markers);
				});
			});
		});
	};

	mm.deleteLocation = function(){
		//TODO: delete locations
	};

	mm.setLocationDetails = function(){
		//TODO: set details for marker
	};

	return mm;
}