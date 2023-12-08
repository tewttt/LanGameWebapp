const cheerio = require("cheerio");
const express = require('express');
const app = express();
const PORT = 3000;

const tdbParser = (htmlText) => {
   const htmlString = `
   <table>
     <tr>
       <td>55555Name</td>
       <td>89898John Doe</td>
     </tr>
     <tr>
       <td>Age</td>
       <td>30</td>
     </tr>
     <tr>
       <td>City</td>
       <td>New York</td>
     </tr>
   </table>
 `;
   const test = `
   <table>
   <tr>
       <td align="right" class="style12">1809030756</td>
       <td class="style13">ХУЛАН СЭРГЭЛЭН</td>
   </tr>
   <tr>
       <td align="right" class="style12">123123</td>
       <td class="style13">ХУЛАН СЭРГЭЛЭН</td>
   </tr>
   </table>
   `
      const $ = cheerio.load(getHtml());
      // const $ = cheerio.load(test);
      // Extract data from HTML elements
      const user = 
      [
         {
         sender: "Илгээгч",
         date: $('tr:nth-child(2) tr:nth-child(1)  tr:nth-child(1)  tr:nth-child(1)  td:nth-child(2) ').text() ,
         bankAccount: $('tr:nth-child(2) tr:nth-child(2) tr:nth-child(2) td:nth-child(1)').text() ,
         name: $('tr:nth-child(2) tr:nth-child(2) tr:nth-child(2) td:nth-child(2)').text() ,
         amount: $('tr:nth-child(2) tr:nth-child(2) tr:nth-child(2) td:nth-child(3)').text() ,
         utga: $('tr:nth-child(2) tr:nth-child(4) td.style12:nth-child(1)').text() ,
     
      },
      {
         recipient: "Хүлээн авагч",
         bankAccount: $('tr:nth-child(2) tr:nth-child(2) tr:nth-child(9) td:nth-child(1)').text() ,
         bankName: $('tr:nth-child(2) tr:nth-child(2) tr:nth-child(7) td:nth-child(2)').text() ,
         name: $('tr:nth-child(2) tr:nth-child(2) tr:nth-child(9) td:nth-child(2)').text() ,
         amount: $('tr:nth-child(2) tr:nth-child(2) tr:nth-child(6) td:nth-child(4)').text() ,
        
      }
   ]
      //   name: $('tr:first-child td:first-child').text() ,
      //   test: $('tr:nth-child(2) td:first-child').text() ,
      // date: $('tr:nth-child(2) td:first-child tr:first-child tr:nth-child(1) tr:nth-child(1) td:nth-child(2)').text() ,
      //   name: $('td:nth-of-type(7)').text(),
      //   name1: $('td.style12:nth-child(2)').text(),
      //   name2: $('td.style12:nth-child(3)').text(),
      //   name3: $('td.style12:nth-child(4)').text(),
     
     
return user





 
//  // Regular expression to extract the value
//  const regex = /<td rowspan="4"[\s\S]*?>([\d,\.]+)<\/td>/;
 
//  // Match the regular expression against the HTML snippet
//  const match = htmlSnippet.match(regex);
 
//  // Extracted value
//  const extractedValue = match && match[1];
 
//  console.log(extractedValue);  // Output: 40,000.00
//    return { from:'', to:'' , fromAmt: 40000, toAmt:40000 }
  
}

const getHtml = () => {

   return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta http-equiv="Content-Type" content="text/html; 
         charset=UTF-8" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>      
      <title>Шилжvvлгийн мэдээлэл</title>
      <style type="text/css">BODY{ FONT-SIZE: 12px; FONT-FAMILY:  "Tahoma GC", Tahoma, Verdana, Arial, Helvetica, sans-serif; color:#000000;}td{ font-size:12px;}.style2 { FONT-WEIGHT: 600; font-size:16px;}.style12 { padding-left:5px; FONT-WEIGHT: bold; FONT-SIZE: 11px; padding-right:5px; }hr{ color:#000000; height:1px;}</style>
   </head>
   <body>
      <center>
         <table height="100%">
            <tr>
               <td height="0%"></td>
            </tr>
            <tr>
               <td>
                  <table width="700" cellpadding="0" style="border:1px solid #c0c0c0; padding:20 20 20 20;" cellspacing="0" >
                     <tr>
                        <td >
                           <table cellpadding="0" cellspacing="1" width="100%" height="100%" border="0">
                              <tr>
                                 <td height="15%" valign="middle">
                                    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
                                       <tr>
                                          <td class="style2 ">Худалдаа Хөгжлийн Банк</td>
                                          <td align="right">Огноо:<span class="style12">2023.12.07 10:46:09</span></td>
                                       </tr>
                                       <tr>
                                          <td colspan="2" height="10" ></td>
                                       </tr>
                                       <tr>
                                          <td align="center" colspan="2" ><span class="style2">Шилжүүлгийн мэдээлэл</span><br>Журналын №:<span class="style12">133608882</span></td>
                                       </tr>
                                       <tr>
                                          <td colspan="2" height="10" ></td>
                                       </tr>
                                       <tr>
                                          <td colspan="2" align="left">Системийн огноо:<span class="style12">2023.12.07</span></td>
                                       </tr>
                                       <tr>
                                          <td colspan="2" height="20">
                                             <hr>
                                          </td>
                                       </tr>
                                       <tr>
                                          <!--<td align="left">Нэвтрэх нэр:<span class="style12">GERELMAA26</span></td>-->                                          
                                          <td align="left">Нэр:<span class="style12">РАГЧАА ГЭРЭЛМАА</span></td>
                                       </tr>
                                    </table>
                                 </td>
                              </tr>
                              <tr>
                                 <td style="padding:10 0 10 20;" height="50%">
                                    <table style="border:1px solid #000000; " width="100%" cellspacing="0" cellpadding="2">
                                       <tr>
                                          <td width="5%" rowspan="2" class="style12" style="border-right: 1px solid; text-align: center;" >Илгээгч</td>
                                          <td width="18%" >Дансны дугаар:</td>
                                          <td width="41%" >Нэр</td>
                                          <td align="center" style="border-right:1px solid; border-left:1px solid" colspan="2">Дүн</td>
                                          <td width="10%" 
                                             align="center" >Ханш</td>
                                       </tr>
                                       <tr>
                                          <td class="style12">824008934</td>
                                          <td class="style12">РАГЧАА ГЭРЭЛМАА</td>
                                          <td width="19%" class="style12" align="right" style=" border-left:1px solid">10,000.00</td>
                                          <td width="7%" class="style12" 
                                             style="border-right:1px solid; ">MNT</td>
                                          <td class="style12" align="right">1.00</td>
                                       </tr>
                                       <tr>
                                          <td colspan="6" style="height:3px;" ></td>
                                       </tr>
                                       <tr>
                                          <td colspan="6" align="center" style=" padding-top:5px; padding-bottom:5px; border-top:1px solid; border-bottom:1px solid"><span class="style12">/&nbsp;арван мянган  төгрөг&nbsp;/</span></td>
                                       </tr>
                                       <tr>
                                          <td colspan="6" style="height:3px;" ></td>
                                       </tr>
                                       <tr>
                                          <td rowspan="4" class="style12" style="border-right: 1px solid; text-align: center;" >Хүлээн<br>                                             авагч        
                                          </td>
                                          <td >Банкны дугаар:</td>
                                          <td >Банкны нэр</td>
                                          <td rowspan="4" class="style12" align="right" style=" border-left:1px solid">10,000.00</td>
                                          <td rowspan="4" class="style12" style="border-right:1px solid;">MNT</td>
                                          <td rowspan="4" align="right" class="style12">1.00</td>
                                       </tr>
                                       <tr>
                                          <td class="style12">040000&nbsp;</td>
                                          <td class="style12">Худалдаа Хөгжлийн Банк&nbsp;</td>
                                       </tr>
                                       <tr>
                                          <td >Дансны дугаар</td>
                                          <td >Нэр</td>
                                       </tr>
                                       <tr>
                                          <td class="style12">824004542</td>
                                          <td class="style12">РАГЧАА ГЭРЭЛМАА</td>
                                       </tr>
                                    </table>
                                 </td>
                              </tr>
                              <tr>
                                 <td >Гүйлгээний утга:</td>
                              </tr>
                              <tr>
                                 <td class="style12" style="padding-bottom: 5px">EB -ddd</td>
                              </tr>
                              <tr>
                              </tr>
                              <tr>
                                 <td class="style2" align="center" style="padding-top:5px">Танд баярлалаа</td>
                              </tr>
                              <!--<tr><td class="style19" height="25">Худалдаа хєгжлийн банкны интернет банкны vйлчилгээ</td></tr>-->
                           </table>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <!--<tr>                                <td>                                    <a href="#demo" class="btn btn-default" data-toggle="collapse" style="width:10px; height: 12px; line-height: 0.1; text-indent: -5px" >+</a>                                   </td>                                                   </tr>-->      
            <tr>
               <td id="demo" class="collapse in">
                  <b>Гүйлгээний баримтыг баталгаажуулсан </b><br>Салбар, тооцооны төв: <br>Гарын үсэг: <br><br>Тамга: <br><br>Огноо:______Он ___Сар ___Өдөр                            
               </td>
            </tr>
            <tr>
               <td height="70%"></td>
            </tr>
         </table>
      </center>
   </body>
</html>
   `
}


// const getHtml = () => {

//    return `<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
//    <html xmlns=\"http://www.w3.org/1999/xhtml\">
//       <head>
//          <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />
//          \t  
//          <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">
//          \t  <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>  \t  <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>      
//          <title>Шилжvvлгийн мэдээлэл</title>
//          <style type=\"text/css\">BODY{ FONT-SIZE: 12px; FONT-FAMILY:  \"Tahoma GC\", Tahoma, Verdana, Arial, Helvetica, sans-serif; color:#000000;}td{ font-size:12px;}.style2 { FONT-WEIGHT: 600; font-size:16px;}.style12 { padding-left:5px; FONT-WEIGHT: bold; FONT-SIZE: 11px; padding-right:5px; }hr{ color:#000000; height:1px;}</style>
//       </head>
//       <body>
//          <center>
//             <table height=\"100%\">
//                <tr>
//                   <td height=\"30%\"></td>
//                   \t\t\t 
//                </tr>
//                <tr>
//                   <td>                  <table width=\"700\" cellpadding=\"0\" style=\"border:1px solid #c0c0c0; padding:20 20 20 20;\" cellspacing=\"0\" >                     
//                <tr>
//                   <td >
//                      <table cellpadding=\"0\" cellspacing=\"1\" width=\"100%\" height=\"100%\" border=\"0\">
//                         <tr>
//                            <td height=\"15%\" valign=\"middle\">
//                               <table width=\"100%\" height=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">
//                                  <tr>
//                                     <td class=\"style2 \">Худалдаа Хөгжлийн Банк</td>
//                                     <td align=\"right\">Огноо:<span class=\"style12\">2022.12.22 19:13:06</span></td>
//                                  </tr>
//                                  <tr>
//                                     <td colspan=\"2\" height=\"10\" ></td>
//                                  </tr>
//                                  <tr>
//                                     <td align=\"center\" colspan=\"2\" ><span class=\"style2\">Шилжүүлгийн мэдээлэл</span><br>Журналын №:<span class=\"style12\">84889548</span></td>
//                                  </tr>
//                                  <tr>
//                                     <td colspan=\"2\" height=\"10\" ></td>
//                                  </tr>
//                                  <tr>
//                                     <td colspan=\"2\" align=\"left\">Системийн огноо:<span class=\"style12\">2022.12.22</span></td>
//                                  </tr>
//                                  <tr>
//                                     <td colspan=\"2\" height=\"20\">
//                                        <hr>
//                                     </td>
//                                  </tr>
//                                  <tr>
//                                     <!--<td align=\"left\">Нэвтрэх нэр:<span class=\"style12\">99856026</span></td>-->                                          
//                                     <td align=\"left\">Нэр:<span class=\"style12\">БААТАРХҮҮ ЭНХТУЯА</span></td>
//                                  </tr>
//                               </table>
//                            </td>
//                         </tr>
//                         <tr>                                 <td style=\"padding:10 0 10 20;\" height=\"50%\">                                    <table style=\"border:1px solid #000000; \" width=\"100%\" cellspacing=\"0\" cellpadding=\"2\">                                       
//                         <tr>
//                            <td width=\"5%\" rowspan=\"2\" class=\"style12\" style=\"border-right: 1px solid; text-align: center;\" >Илгээгч</td>                                          
//                            <td width=\"18%\" >Дансны дугаар:</td>
//                            <td width=\"41%\" >Нэр</td>
//                            <td align=\"center\" style=\"border-right:1px solid; border-left:1px solid\" colspan=\"2\">Дүн</td>                                          
//                            <td width=\"10%\" align=\"center\" >Ханш</td>
//                         </tr>
//                         <tr>
//                            <td class=\"style12\">472022324</td>
//                            <td class=\"style12\">БААТАРХҮҮ ЭНХТУЯА</td>
//                            <td width=\"19%\" class=\"style12\" align=\"right\" style=\" border-left:1px solid\">40,000.00</td>
//                            <td width=\"7%\" class=\"style12\" style=\"border-right:1px solid; \">MNT</td>                                          
//                            <td class=\"style12\" align=\"right\">1.00</td>
//                         </tr>
//                         <tr>
//                            <td colspan=\"6\" style=\"height:3px;\" ></td>
//                         </tr>
//                         <tr>                                          <td colspan=\"6\" align=\"center\" style=\" padding-top:5px; padding-bottom:5px; border-top:1px solid; border-bottom:1px solid\"><span class=\"style12\">/&nbsp;дөчин мянган  төгрөг&nbsp;/</span></td>                                       </tr>
//                         <tr>
//                            <td colspan=\"6\" style=\"height:3px;\" ></td>
//                         </tr>
//                         <tr>
//                            <td rowspan=\"4\" class=\"style12\" style=\"border-right: 1px solid; text-align: center;\" >Хүлээн<br>                                             авагч                                          </td>                                          
//                            <td >Банкны дугаар:</td>
//                            <td >Банкны нэр</td>
//                            <td rowspan=\"4\" class=\"style12\" align=\"right\" style=\" border-left:1px solid\">40,000.00</td>
//                            <td rowspan=\"4\" class=\"style12\" style=\"border-right:1px solid;\">MNT</td>                                          
//                            <td rowspan=\"4\" align=\"right\" class=\"style12\">1.00</td>
//                         </tr>
//                         <tr>
//                            <td class=\"style12\">15&nbsp;</td>
//                            <td class=\"style12\">Голомт төв банк&nbsp;</td>
//                         </tr>
//                         <tr>
//                            <td >Дансны дугаар</td>
//                            <td >Нэр</td>
//                         </tr>
//                         <tr>
//                            <td class=\"style12\">1809030756</td>
//                            <td class=\"style12\">ХУЛАН СЭРГЭЛЭН</td>
//                         </tr>
//                      </table>
//                   </td>
//                </tr>
//                <tr>
//                   <td >Гүйлгээний утга:</td>
//                </tr>
//                <tr>                                 <td class=\"style12\" style=\"padding-bottom: 5px\">EB -энхтуяа 88603899 526600631</td>                              </tr>
//                \t\t\t\t\t\t\t   
//                <tr>                                                               </tr>
//                <tr>
//                   <td class=\"style2\" align=\"center\" style=\"padding-top:5px\">Танд баярлалаа</td>
//                </tr>
//                <!--<tr><td class=\"style19\" height=\"25\">Худалдаа хєгжлийн банкны интернет банкны vйлчилгээ</td></tr>-->                           
//             </table>
//             </td>                     </tr>                  </table>               </td>            </tr>\t\t\t <!--<tr>\t\t\t\t <td>\t\t\t\t\t <a href=\"#demo\" class=\"btn btn-default\" data-toggle=\"collapse\" style=\"width:10px; height: 12px; line-height: 0.1; text-indent: -5px\" >+</a>  \t\t\t\t </td>\t\t\t\t \t\t\t </tr>-->\t\t\t 
//             <tr>
//                \t\t\t\t 
//                <td id=\"demo\" class=\"collapse in\">\t\t\t\t\t <b>Гүйлгээний баримтыг баталгаажуулсан </b><br>Салбар, тооцооны төв: <br>Гарын үсэг: <br><br>Тамга: <br><br>Огноо:______Он ___Сар ___Өдөр\t\t\t\t</td>
//                \t\t\t 
//             </tr>
//             <tr>
//                <td height=\"70%\"></td>
//             </tr>
//             </table>      
//          </center>
//       </body>
//    </html>
//    `
// }

module.exports = {
   tdbParser
 };