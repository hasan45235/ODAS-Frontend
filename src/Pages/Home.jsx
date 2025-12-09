import { Box, Typography } from '@mui/material'
import React from 'react'
import docImg from "../online-doctor.avif"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import doctorImg from '../doctor.png'
import appImg from '../appointment.png'
import patImg from '../patients.png'
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import chooseImg from "../chose.webp"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LockIcon from '@mui/icons-material/Lock';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import TestimonialCard from '../Components/Testimonials';
import FAQs from '../Components/FAQs';

const Home = () => {
  return (
    <>
        <Box>
            <Box sx={{display:"flex",justifyContent:"space-around",mb:8,mt:4}}>
                <Box sx={{mt:8,ml:4}}>
                    <Typography variant="h2" sx={{fontWeight:"bold"}} >Book Doctor Appointments Online - Anytime, Anywhere</Typography>
                    <Box component="form"   autoComplete="off">
                      <Box sx={{display:"flex",flexDirection:"column",mt:4,width:"100%"}}>  
                        <Box sx={{display:"flex",gap:2,mb:2,width:"100%"}}>
                          <TextField  id="outlined-basic" label="Specialization" variant="outlined" />
                          <TextField id="outlined-basic" label="City" variant="outlined" />
                        </Box>
                        <Box sx={{display:"flex",gap:2,mb:2,width:"100%"}}>
                          <Button sx={{height:"50px",width:"220px"}} variant="contained"> Book Appointment </Button>
                          <Button sx={{height:"50px",width:"220px"}} variant="outlined">Find a Doctor</Button>
                        </Box>
                      </Box>
                    </Box>
                </Box>
                <Box>
                    <Box
                      component="img"
                      src={docImg}
                      alt="Doctor"
                      sx={{ width: "500px", height: "auto", borderRadius: 2 }}
                    />
                </Box>

            </Box>
            <Box sx={{width:"90%",margin:"0px auto"}}>
                <Typography variant="h3" sx={{fontWeight:"600"}} color="initial">How It Works</Typography>
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                    <Box sx={{width:"25%",height:"25vh",backgroundColor:"white",borderRadius:"20px",p:3}}>
                      <Box component="img" src={patImg} alt="Doctor" sx={{ width: "50px", height: "auto", borderRadius: 2 }}/>  
                      <Typography variant="h6" color="initial">Sign Up</Typography>
                      <Typography variant="body1" sx={{color:"grey",fontSize:"14px"}} >Register yourself to get started.</Typography>
                    </Box>
                    <Box sx={{width:"25%",height:"25vh",backgroundColor:"white",borderRadius:"20px",p:3}}>
                      <Box component="img" src={doctorImg} alt="Doctor" sx={{ width: "50px", height: "auto", borderRadius: 2 }}/>  
                      <Typography variant="h6" color="initial">Choose Doctor</Typography>
                      <Typography variant="body1" sx={{color:"grey",fontSize:"14px"}} >Select the preferred doctor.</Typography>
                    </Box>
                    <Box sx={{width:"25%",height:"25vh",backgroundColor:"white",borderRadius:"20px",p:3}}>
                      <Box component="img" src={appImg} alt="Doctor" sx={{ width: "50px", height: "auto", borderRadius: 2 }}/>  
                      <Typography variant="h6" color="initial">Book Appointment</Typography>
                      <Typography variant="body1" sx={{color:"grey",fontSize:"14px"}} >Book your appointment online.</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{width:"90%",margin:"50px auto"}}>
                <Typography variant="h3" sx={{fontWeight:"600"}} color="initial">Features</Typography>
                <Box sx={{display:"flex",gap:2,justifyContent:"center"}}>
                    <Box sx={{color: "#527dc7",display:"flex",alignItems:"center",gap:1,backgroundColor:"white",padding:"30px 0px",width:"100%",borderRadius:"10px"}}><i className="fa-regular fa-alarm-clock fa-2xl" ></i><Typography variant="body1" sx={{fontSize:"20px"}} color="initial">Fast Online Booking</Typography> </Box>
                    <Box sx={{color: "#527dc7",display:"flex",alignItems:"center",gap:1,backgroundColor:"white",padding:"30px 0px",width:"100%",borderRadius:"10px"}}><i className="fa-solid fa-user-doctor fa-2xl" ></i><Typography variant="body1" sx={{fontSize:"20px"}} color="initial">Trusted Doctors</Typography></Box>
                </Box>
                <Box sx={{display:"flex",gap:2,justifyContent:"center"}}>
                    <Box sx={{color: "#527dc7",display:"flex",alignItems:"center",gap:1,backgroundColor:"white",padding:"30px 0px",width:"100%",borderRadius:"10px"}}><i className="fa-solid fa-sack-xmark fa-2xl" ></i> <Typography variant="body1" sx={{fontSize:"20px"}} color="initial">No Extra Charges</Typography></Box>
                    <Box sx={{color: "#527dc7",display:"flex",alignItems:"center",gap:1,backgroundColor:"white",padding:"30px 0px",width:"100%",borderRadius:"10px"}}><i className="fa-solid fa-shield-halved fa-2xl"></i> <Typography variant="body1" sx={{fontSize:"20px"}} color="initial">Secure Records</Typography></Box>
                </Box>
            </Box>
            <Box sx={{textAlign:"center"}}>
              <Box sx={{width:"60%",margin:"0px auto 20px"}}>
                <Typography variant="h3" sx={{fontWeight:"600"}} color="initial">Achievements</Typography>
                <Typography variant="body1" color="initial">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic mollitia, pariatur exercitationem magni error voluptas, aliquam illum soluta iure maxime inventore itaque debitis ipsum facilis, natus maiores? Est, aliquid aliquam.</Typography>
                <hr style={{width:"40%",margin:"20px auto"}}/>
              </Box>
              <Box sx={{display:"flex",gap:2,justifyContent:"space-around",mt:4}}>
                <Box>
                  <PeopleIcon sx={{fontSize:"70px",color:"white",backgroundColor:"#527dc7",p:2,borderRadius:"50%"}}/>
                  <Typography variant="body1" sx={{fontSize:"40px",p:0,m:0,fontWeight:"bold"}} color="initial">120K</Typography>
                  <Typography variant="body1" sx={{fontSize:"12px",color:"grey"}} color="initial">Happy Customers</Typography>  
                </Box>
                <Box>
                  <VaccinesIcon sx={{fontSize:"70px",color:"white",backgroundColor:"#527dc7",p:2,borderRadius:"50%"}}/>
                  <Typography variant="body1" sx={{fontSize:"40px",p:0,m:0,fontWeight:"bold"}} color="initial">1890+</Typography>
                  <Typography variant="body1" sx={{fontSize:"12px",color:"grey"}} color="initial">Issues Solved</Typography>
                </Box>
                <Box>
                  <EmailOutlinedIcon sx={{fontSize:"70px",color:"white",backgroundColor:"#527dc7",p:2,borderRadius:"50%"}}/>
                  <Typography variant="body1" sx={{fontSize:"40px",p:0,m:0,fontWeight:"bold"}} color="initial">250K</Typography>
                  <Typography variant="body1" sx={{fontSize:"12px",color:"grey"}} color="initial">Finished Projects</Typography>
                </Box>
                <Box>
                  <EmojiEventsIcon sx={{fontSize:"70px",color:"white",backgroundColor:"#527dc7",p:2,borderRadius:"50%"}}/>
                  <Typography variant="body1" sx={{fontSize:"40px",p:0,m:0,fontWeight:"bold"}} color="initial">786+</Typography>
                  <Typography variant="body1" sx={{fontSize:"12px",color:"grey"}} color="initial">Awards Winning</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{margin:"100px 0px"}}>
              <Typography variant="h3" sx={{fontWeight:"600",textAlign:"center",mb:"50px"}} color="initial">Why Choose Us</Typography>
              <Box sx={{display:"flex",justifyContent:"space-around"}}>
                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                  <Box sx={{display:"flex", padding:"20px 10px",width:"70%",boxShadow:"0px 0px 5px grey",mt:2}}>
                    <VerifiedUserIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px"}}/>
                    <Box>
                      <Typography variant="h6" color="initial">Verified Doctors</Typography>
                      <Typography variant="body1" sx={{color:"grey",fontSize:"14px"}}>Every doctor on our platform is professionally verified.</Typography>
                    </Box>
                  </Box>
                  <Box sx={{display:"flex", padding:"20px 10px",width:"70%",boxShadow:"0px 0px 5px grey",mt:2}}>
                    <EditCalendarIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px"}}/>
                    <Box>
                      <Typography variant="h6" color="initial">Verified & Trusted Doctors</Typography>
                      <Typography variant="body1" sx={{color:"grey",fontSize:"14px"}}>Every doctor on our platform is professionally verified.</Typography>
                    </Box>
                  </Box>
                  <Box sx={{display:"flex", padding:"20px 10px",width:"70%",boxShadow:"0px 0px 5px grey",mt:2}}>
                    <LockIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px"}}/>
                    <Box>
                      <Typography variant="h6" color="initial">Secure Digital Medical Records</Typography>
                      <Typography variant="body1" sx={{color:"grey",fontSize:"14px"}}>Your prescriptions, reports and appointment history stay secured, organized and accessable anytime.</Typography>
                    </Box>
                  </Box>
                  <Box sx={{display:"flex", padding:"20px 10px",width:"70%",boxShadow:"0px 0px 5px grey",mt:2}}>
                    <HeadsetMicRoundedIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px"}}/>
                    <Box>
                      <Typography variant="h6" color="initial">24/7 Support & Assistance</Typography>
                      <Typography variant="body1" sx={{color:"grey",fontSize:"14px"}}>Whether it's scheduling help or medical guidance, our team provides round-the-clock support.</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{width:"50%"}}>
                  <Box component="img" src={chooseImg} alt="img" sx={{width:"80%",height:"auto",border:"1px solid black",borderTopRightRadius:"50%",borderBottomLeftRadius:"50%",borderTopLeftRadius:"5%",borderBottomRightRadius:"5%"}}></Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{textAlign:"center"}}>
              <Typography variant="h3" color="initial">Testimonials</Typography>
              <Box sx={{margin:"100px 0px"}}>
                <Box sx={{display:"flex"}}>
                  <TestimonialCard name="Mark Smith" role="Product Designer" img={patImg} text="Finding a reliable healthcare provider used to be a challenge for me, but this platform has made the entire process incredibly simple. The consultation was thorough, the environment felt safe, and the staff was patient and knowledgeable. Highly recommended!" rating={5}/>
                  <TestimonialCard name="Sarah Mitchell" role="Teacher" img={patImg} text="From the moment I stepped in, I felt welcomed and cared for. The appointment was on time, the checkup was detailed, and the support staff was extremely helpful with reports and follow-ups. This is exactly how healthcare should be—efficient, kind, and reliable." rating={4.5}/>
                </Box>
                
              </Box>
            </Box>
            <Box >
              <Typography sx={{textAlign:"center"}} variant="h3" color="initial">FAQs</Typography>
              <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                <FAQs num="one" question="What is the purpose of this platform?" answer="This platform is designed to facilitate online doctor appointments, making healthcare more accessible and convenient for patients."/>
                <FAQs num="two" question="How does the platform verify doctors?" answer="Every doctor undergoes an approval process by the admin. Their qualifications, specialization, and experience are reviewed before their profile becomes active on the platform."/>
                <FAQs num="three" question="How are schedules managed on the platform?" answer="Doctors can set their available days and time slots. Patients can only book slots that are open. Admin can also view or update any doctor’s schedule if needed."/>
                <FAQs num="four" question="Is my personal and medical information secure?" answer="Absolutely. Your data is encrypted and stored securely. Only you and your assigned doctor have access to your medical records and appointments. The platform follows strict privacy and security standards."/>
                <FAQs num="five" question="Does the platform support multiple hospitals or clinics?" answer="Yes. Doctors can add multiple clinic or hospital locations to their profiles, and each location can have its own schedule and consultation fee. Patients can choose the preferred location when booking an appointment, making the system flexible for multi-clinic doctors."/>
              </Box>
            </Box>
        </Box>
    </>
  )
}

export default Home

// Hero Section

// Specializations Search

// How It Works

// Features

// Stats / Achievements

// Why Choose Us

// Patient Success Stories (optional)

// Testimonials

// Safety & Security

// FAQ

// Final Call-to-Action (CTA)

// Footer