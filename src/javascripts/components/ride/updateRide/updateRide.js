import rideData from '../../../helpers/data/rideData';
import displayRide from '../displayRides/displayRides';
import utils from '../../../helpers/utils';
import auth from '../../../helpers/data/authData';
import './updateRide.scss';

const fixRide = (e) => {
  if (!auth.isAuthenticated()) return;
  const rideId = e.target.dataset.brokenride;
  rideData.getRides()
    .then((rides) => {
      const rideById = rides.find((singleRide) => singleRide.id === rideId);
      const fixedRideObj = {
        name: rideById.name,
        description: rideById.description,
        imageUrl: rideById.imageUrl,
        isAvailable: true,
      };
      rideData.updateRide(rideId, fixedRideObj)
        .then(() => displayRide.buildRideModule());
    })
    .catch((err) => err);
};

const updateRideForm = (e) => {
  const rideId = e.target.closest('.card').id;
  $('.createRideBtn').addClass('hide');
  rideData.getRides()
    .then((rides) => {
      const rideById = rides.find((singleRide) => singleRide.id === rideId);
      const domString = `
        <div class="closeForm">
        <i class="fas fa-window-close closeForm mb-1"></i>
        </div>
        <h5 class="homeH3 mb-0 text-left">Update Ride</h5>
        <form>
        <div class="form-group mb-0">
        <label for="coaster-name" class="mb-0">Name:</label>
        <input type="text" class="form-control" id="coaster-name" value="${rideById.name}">
        </div>
        <div class="form-group mb-0">
        <label for="coaster-image" class="mb-0 mt-1">Image URL:</label>
        <input type="text" class="form-control" id="coaster-image" value="${rideById.imageUrl}">
        </div>
        <div class="form-group mb-0">
        <label for="coaster-description" class="mb-0 mt-1">Description:</label>
        <input type="text" class="form-control" id="coaster-description" value="${rideById.description}">
        </div>
        <div class="form-check mb-1 mt-1">
        <input type="checkbox" class="form-check-input" id="operationalCheck">
        <label class="form-check-label" for="operationalCheck">Operational</label>
        </div>
        <button type="button" class="btn btn-primary updateSubmit mt-2" data-rideid="${rideById.id}">Update</button>
        </form>
  `;
      utils.printToDom('.rideForm', domString);
    })
    .catch((err) => (err));
};

const updateRide = () => {
  if (!auth.isAuthenticated()) return;
  const rideId = $('.updateSubmit').data('rideid');
  const updatedRideObj = {
    name: $('#coaster-name').val(),
    description: $('#coaster-description').val(),
    imageUrl: $('#coaster-image').val(),
    isAvailable: $('#operationalCheck').prop('checked'),
  };
  rideData.updateRide(rideId, updatedRideObj)
    .then(() => displayRide.buildRideModule())
    .catch((err) => (err));
};

const clearForm = () => {
  $('.createRideBtn').removeClass('hide');
  const domString = '';
  utils.printToDom('.rideForm', domString);
};

export default {
  fixRide,
  updateRideForm,
  updateRide,
  clearForm,
};
