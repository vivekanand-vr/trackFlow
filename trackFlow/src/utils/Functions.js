// Utility function to sort jobs by date (Descending Order)
export const sortJobsByDateDes = (jobsArray) => {
    return jobsArray.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Utility function to sort jobs by date (Ascending Order)
export const sortJobsByDateAsc = (jobsArray) => {
  return jobsArray.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
};
  
// Utility function to sort jobs by salary (CTC Highest First)
export const sortJobsByCtcDes = (jobsArray) => {
  return jobsArray.slice().sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary));
};

// Utility function to sort jobs by salary (CTC Lowest First)
export const sortJobsByCtcAsc = (jobsArray) => {
  return jobsArray.slice().sort((a, b) => parseFloat(a.salary) - parseFloat(b.salary));
};

