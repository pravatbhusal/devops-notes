package com.pbhusal;

import javax.servlet.annotation.WebServlet;

import io.prometheus.client.exporter.MetricsServlet;

@WebServlet("/metrics")
public class MonitorServlet extends MetricsServlet {

	private static final long serialVersionUID = 1L;
	
}
