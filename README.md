# control_pupil

# It can be used for education centres 
# It has education centre (defined as role admin) and pupil 
# Role can be defined in headers role :"admin" or "user"



# Main url for this
 # url https://control-pupil.onrender.com/


 # It has AUTH part 
  
  For users it is 
   # users/signup requirments : username , password , email
   # users/ login requirements : email and password 

   And it has vaidateEmail() middleware too


# For admin 

/admin/auth/create-account   requirements : firstName , lastName , password
/admin/auth/login-account   requirements : firstName , password



# AND FOR USERS
 it has test part users can solve bunch of tests 

tests/solve-test (post request ) requirements : userId, testId, selectedAnswer  , themeName(request.body)



# And admin can deal with test email and craete theme for tests and can get score for specific user


# Email 
it has  only send email : 
requirements : to , body , subject authRole  , authToken 



# An admin can use crud operation over this 
admin/tests/create-test     requirements : themeName, question, a, b, c, d, trueAnswer, adminId 
/admin/tests/update-test/:testId requirements :  testId(params) themeName, question, a, b, c, d, trueAnswer (body)
/admin/tests/delete-test/:testId requirements : testId(params)
/admin/tests/get/:adminId get admin created Test (adminId) params 
/admin/tests/get/:testId get test by its id (testId) params 


# Themes  it has crud operation too 

create theme : /admin/theme/create-theme , requirements :  themeName , adminId 
get theme by its id : admin/theme/get-theme/:themeId requirements :  themeId request params 
get all themes   admin/theme//get-all
 admin created themes : admin/theme/get-theme/:adminId  requirements : adminId request params 
update theme  : admin/theme/update-theme/:themeId requirements :  themeId params; updatedThemName, adminId request.body;
  
delete theme : admin/theme/delete-theme/:themeId requirements  themeId request.params ; adminId request.body 


# And an admin can get all user scores or single user score 

/admin/user-score/get/user/score/:userId requirements : userId request.params 
/admin/user-score/get-all n o requirements 










 