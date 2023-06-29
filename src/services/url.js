const baseurl="https://studynotionbackend.onrender.com/api/v1";
const socialbaseurl="https://studynotionbackend.onrender.com/auth";

export const auth={
    loginurl:baseurl+"/login",
    signupurl:baseurl+"/signup",
    sendotp:baseurl+"/sendotp",
    changepasswordurl:baseurl+"/changepassword",
    resetpasswordtokenurl:baseurl+"/reset-password-token",
    resetpasswordurl:baseurl+"/reset-password"
}

export const category={
    showAllCategoriesurl:baseurl+"/showAllCategories",
    getcategorydetail:baseurl+"/getCategoryPageDetails",
}

export const contactusurl=baseurl+"/contactus"


export const course={
    createCourseurl:baseurl+"/createCourse",
    getcoursedetailsurl:baseurl+"/getCourseDetails",
    updatecourseurl:baseurl+"/updatecourse",
    getcoursesofuserurl:baseurl+"/getcoursesofuser",
    deletecourseurl:baseurl+"/deleteCourse",
    updatecoursestatusurl:baseurl+"/updatecoursestatus",
    getallcoursesurl:baseurl+"/getAllCourses",
    getfulldetailsofcourseurl:baseurl+"/getfulldetailsofcourse"
}


export const payment={
    capturepaymenturl:baseurl+"/capturePayment",
    verifysignatureyurl:baseurl+"/verifySignature",
    sendpaymentconfirmationurl:baseurl+"/sendpaymentconfirmation",
    getpaymentdetailsurl:baseurl+"/sendpaymentdetails",
    getorderhistoryurl:baseurl+"/getorderhistory"
}


export const profile={
    updateprofilepicurl:baseurl+"/updateDisplayPicture",
    updateprofileurl:baseurl+"/updateProfile",
    deleteaccounturl:baseurl+"/deleteAccount",
    getenrolledcourseurl:baseurl+"/getEnrolledCourses",
}

export const ratingreview={
    ratingreviewsubmiturl:baseurl+"/createRating",
    getallratingsurl:baseurl+"/getReviews",
    getAverageRatingurl:baseurl+"/getAverageRating"
}

export const section={
    getsectionsofacourseurl:baseurl+"/getsectionsofacourse",
    addsectionurl:baseurl+"/addSection",
    deletesectionurl:baseurl+"/deleteSection",
    updatesectionurl:baseurl+"/updateSection",
    markascompleteurl:baseurl+"/markascomplete"
}


export const subsction={
    createsubsectionurl:baseurl+"/addSubSection",
    deletesubsectionurl:baseurl+"/deleteSubSection",
    updatesubsectionurl:baseurl+"/updateSubSection"
}

export const googleauth={
    displayurl:baseurl+"/auth/google"
}

export const sociallogin={
    getuserdataurl:socialbaseurl+"/login/userdetails",
    logouturl:socialbaseurl+"/logout",
    googleurl:socialbaseurl+"/google",
    linkedinurl:socialbaseurl+"/linkedin",
    githuburl:socialbaseurl+"/github"
}










