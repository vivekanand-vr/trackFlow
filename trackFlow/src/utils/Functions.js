// Utility function to sort jobs by date
export const sortJobsByDate = (jobsArray) => {
    return jobsArray.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
};
  
// Utility function to sort jobs by salary (CTC)
export const sortJobsByCTC = (jobsArray) => {
  return jobsArray.slice().sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary));
};