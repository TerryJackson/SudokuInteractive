import java.io.IOException;
import java.io.PrintWriter;
import org.jsoup.Jsoup;
import org.jsoup.nodes.*;


public class Program 
{
	public static void main(String[] args) throws IOException
	{
		int level = 1; 
		String sudokuFile = "";
		
		for (int id = 1; id <= 10; id++)
		{
			sudokuFile += getSudoku(level, id);
			
			if (id < 10) //no need to add a new line to the last entry.
				sudokuFile += "\n";	
		}
	    
	    try{
	    	String fileName = "sudoku_puzzles_" + levelToString(level) + ".txt";
	        PrintWriter writer = new PrintWriter(fileName, "UTF-8");
	        writer.println(sudokuFile);
	        writer.close();
	    } catch (IOException e) {
	       // handle exception
	    }
	}
	
	
	public static String levelToString(int level)
	{
		if (level == 1)
			return "Easy";
		else if (level == 2)
			return "Medium";
		else if (level == 3)
			return "Hard";
		else if (level == 4)
			return "Evil";
		else
			return "Error";
	}
	
	
	public static String getSudoku(int level, int puzzleID) throws IOException
	{
		String url = "http://show.websudoku.com/?level=" + level + "&set_id=" + puzzleID;
	    Document doc = Jsoup.connect(url).userAgent("Mozilla/5.0").get();
		
		String sudoku = "";
	    
	    for (int r = 0; r < 9; r++)
	    	for (int c = 0; c < 9; c++) 
	    	{
	    		// The id of the element that contains the value of the sudoku cell
	    		// is "f" + (column value) + (row value).
	    		// So for example the HTML element with id of f40 will have its value
	    		// attribute equaling the value of the cell at row=0 and column = 4. 
	    		// This is their HTML convention.
	    		String elemID = "f" + c + r;
	    		Element elem = doc.getElementById(elemID);
	    		
	    		String val = elem.attr("value");
	    	    
	    	    if (val == "")
	    	    	val = "0";
	    	    
	    	    sudoku += val;
	    	}
	    
	    sudoku += " "; //this space at the end of the digit stream indicates the end of the puzzle
	    sudoku += "L=" + level + " ID=" + puzzleID; // This is the identifying info for the puzzle
		
	    return sudoku;
	}
}
