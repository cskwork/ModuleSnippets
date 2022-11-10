  /**
  INPUT
    LocalDateTime now = LocalDateTime.now();
    String formatDateTime = convertLocalDateTimeToStringFormat(now , "yyyy-MM-dd");
  OUTPUT
    2022-11-10
  */
  public static String convertLocalDateTimeToStringFormat(LocalDateTime inputDate , String datePattern){
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern(datePattern);
      String formatDateTime = inputDate.format(formatter);
      return formatDateTime;
  };
// ========================================================================================================================
  /**
  INPUT
    String dateTime = "1995-07-25 15:03:21.000";
    LocalDateTime date  = convertStringFormatToLocalDateTime(dateTime , "yyyy-MM-dd HH:mm:ss.SSS");
  OUTPUT
    After : 1995-07-25T15:03:21
  */
  public static LocalDateTime convertStringFormatToLocalDateTime(String stringDate , String stringPattern){
        boolean isValidStringPattern = (
            stringPattern.equals("yyyy-MM-dd HH:mm") 
            || stringPattern.equals("yyyy-MM-dd HH:mm:ss")
            || stringPattern.equals("yyyy-MM-dd HH:mm:ss.SSS")
        );
        boolean isValidStringDate = ( stringDate.length() == stringPattern.length() );
        
        if(!isValidStringPattern){
             System.out.println(stringPattern+ " = NOT VALID PATTERN");
        }
        if(!isValidStringDate){
             System.out.println(stringDate+ " = NOT VALID DATE");
        }
        
        DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern(stringPattern);
        LocalDateTime date = LocalDateTime.parse(stringDate, dateTimeFormat);
        return date;
   }



// ========================================================================================================================
