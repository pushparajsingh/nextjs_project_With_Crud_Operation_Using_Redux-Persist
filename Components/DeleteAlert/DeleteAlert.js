import Swal from "sweetalert2";

const DeleteAlert = (dispatch, deleteData, Id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your record has been deleted.", "success");
      dispatch(deleteData(Id));
    }
  });
};

export default DeleteAlert;
