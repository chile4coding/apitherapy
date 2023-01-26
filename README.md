# apitherapy
The Therapy App API Endpoints and backend

User signup
'https://apitherapy-production.up.railway.app/usersignup'
method: "POST"
input values  
name, email, password: 
=======================================================
user login

''https://apitherapy-production.up.railway.app/userlogin'
method: "POST"
input values
email, password
validation
password must be at least six characters
email must be in email format

=======================================================
Therapist signup
''https://apitherapy-production.up.railway.app/therapistsignup'

method: "POST"
input values
name, email,password, location, liscense, specialty

validation
password must be at least six characters
email must be in email format
loaction , license, specialty must not be empty
==========================================================

Therapist login
https://apitherapy-production.up.railway.app/tharapistlogin

method: "POST"
input values
email, password
=========================================================
Therapist / client user dashboard
 https://apitherapy-production.up.railway.app/dashboard'

method: "GET"
input values
headers: “Bearer “ + token
==========================================================



Booking appointment
' https://apitherapy-production.up.railway.app/bookappointment'

method: "POST"
input values

 Hearder token 
 username ,therapistname ,therapistId , meetingType , disorderType,  appointmentTime , therapistEmail , userEmail , day, DOB, phoneNumber, description

Authentication
route protected
==============================================

Profile picture upload
' https://apitherapy-production.up.railway.app /uploadImage'

method: "POST"
input values
token
image file

Authentication
route protected
code example

const url = " https://apitherapy-production.up.railway.app /uploadImage"
fetch(url, {
headers: "Bearer " + token       // there must be a space  after the Bearer string
body: formData
})

Client confirm registration
https://apitherapy-production.up.railway.app/usersignupconfirm

method: "POST"
input values
OTP: string
============================================================
Therapist sign up confirmation
Same a client confirmation
' https://apitherapy-production.up.railway.app therapistconfirmsignup’
================================================================




Client user onboarding
' https://apitherapy-production.up.railway.app/useronboarding'

method: "POST"
input values
hobbies, stateOforigin, marriageStatus

Therapist  user onboarding
' https://apitherapy-production.up.railway.app/ therapistonboarding'
Same as client user onboarding

When the client user / therapist onboard the boarded field is activated which will enable the user to login

Client user profile updates
https://apitherapy-production.up.railway.app/edituserptofile
method: “PUT”
input values
email, name, location
headers: Bearer + token
============================================================

Therapist user profile updates
https://apitherapy-production.up.railway.app/ edittherapistprofile
method: “PUT”
input values
email, name, location, specialty, liscense
headers: Bearer + token
=============================================================
Send frequently asked question
https://apitherapy-production.up.railway.app/ sendfaq
input values
email, name, message, questionType
method: “POST”
=====================================================
Get frequently asked questions
https://apitherapy-production.up.railway.app/getfaqs
===================================================
Get sessions booked by a user
https://apitherapy-production.up.railway.app/getsessions
method: “GET”
headers : ‘Bearer ‘ + token

Get All therapists
https://apitherapy-production.up.railway.app/getTherapists
method: “GET”
headers : ‘Bearer ‘ + token


