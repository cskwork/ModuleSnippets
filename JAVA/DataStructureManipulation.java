
// Combine HashMap Lists
public static List<HashMap> mergeHashMapLists(List<HashMap> map1, List<HashMap> map2){
		List<HashMap> resultCombinedMap = new ArrayList<HashMap>();
		
		if(map1.size() != map1.size()) {
			return resultCombinedMap;
		}
		
		for (int i = 0; i < map1.size(); i++) {
			String key1 = (String) map1.get(i).get("KEYNAME");
			String key2 = (String) map2.get(i).get("KEYNAME");
			if( key1.equals(key2)) {
				resultCombinedMap.add(map1.get(i));
				
			}
		}	
		return resultCombinedMap;
	}
