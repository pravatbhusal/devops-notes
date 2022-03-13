package com.pbhusal;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.prometheus.client.Counter;
import lombok.extern.log4j.Log4j2;

@Log4j2
@WebServlet("/")
public class MainServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * This is a Counter metric to count the number of requests.
	 * 
	 * Check out the other types of metrics here: https://github.com/prometheus/client_java
	 */
	private static final Counter requests = Counter.build().name("RequestsTotal").help("The total number of requests since the server has been running.").register();
       
    public MainServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// Log the request and increment the requests counter
		log.info("Client requested a GET request on the root end-point.");
		requests.inc();
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		try {
			out.println("<h1>Monitoring with Prometheus and Grafana</h1>");
		} finally {
			out.close();
		}
	}

}
