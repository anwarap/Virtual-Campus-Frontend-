
const Adminroutes = {
    login:"/admin/login",
    logout:"/admin/logout",
    getUsers:"/admin/users",
    getTeachers:"/admin/teachers",
    blockUser:"/admin/block-user",
    blockTeacher:"/admin/block-teacher",
    getCategory:"/admin/category",
    createCategory:"/admin/create-category",
    getCourse:"/admin/get-courses",
    approveCourse: (courseId) => `/admin/courses/${courseId}/status`,
    
}


export default Adminroutes