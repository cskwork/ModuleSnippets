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




// ========================================================================================================================
