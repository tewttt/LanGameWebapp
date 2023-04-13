import React from "react";
import css from "./style.module.css"
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

const AccordionSummaryCmp = (props) => {
//     return questions.map((ques, i) => (
//         <AccordionSummary
//                                             aria-controls="panella-content"
//                                             id="panella-header"
//                                             elevation={1} style={{width: "100%"}}
//                                         > 
//                                             {questions[i].open ? (
//                                                 <div className="savedQuestions">
//                                                     <Typography 
//                                                         style={{fontSize: "15px", fontWeight: "400", letterSpacing: "1px", lineHeight: "24px", paddingBottom:"5px"}}>
//                                                         {i+1}. {questions[i].questionText}
//                                                     </Typography>

//                                                     {ques.options.map((op, j) => (
//                                                         <div 
//                                                         key={j}
//                                                         >
//                                                             <div style={{display: "flex"}}>
//                                                                 <FormControlLabel style={{marginLeft: "5px", marginBottom: "5px"}}
//                                                                     disabled control=  {<input type={ques.questionType} 
//                                                                     color="primary" style={{marginRight: "3px"}} required={ques.type}
//                                                                     /> }
//                                                                     label={
//                                                                         <Typography style={{fontFamily: "Roboto , Arial, sans-serif", 
//                                                                         fontSize: "13px",
//                                                                         fontWeight: "400",
//                                                                         letterSpacing: "2px",
//                                                                         lineHeight: "20px",
//                                                                         color: "#202124"}}>
//                                                                             {ques.options[j].optionText}

//                                                                         </Typography>
//                                                                     }
                                                                    
                                                                
//                                                                 />
//                                                             </div>

//                                                         </div>
//                                                     ))} 
                                                    
//                                                 </div>
//                                             ):""}

                                        
//         </AccordionSummary>
// ))
}

export default AccordionSummaryCmp;