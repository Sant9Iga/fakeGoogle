package com.happynik.proxygogle.Servlets;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.*;



public class ProxyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/pages/index.ftl").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("text/html;charset=UTF-8");
		String querry =java.net.URLEncoder.encode(req.getParameter("querry"),"UTF-8");
        String startFrom = req.getParameter("startFrom");
        querry = querry.replace(' ','+');
        URL url = new URL("https://www.googleapis.com/customsearch/v1?q=" +querry + "&c2coff=Ru&cx=001214352836835074626:ajl1g5llbkc&lr=lang_ru&key=AIzaSyAboLpATDyas1fx9gV5Y04tyU8IN994bWU&start="+startFrom);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        int statusCode = connection.getResponseCode();
        InputStream is;
        if (statusCode != HttpURLConnection.HTTP_OK) {
            is = connection.getErrorStream();
        } else {
            is = connection.getInputStream();
        }
        BufferedReader br = new BufferedReader(new InputStreamReader(is,"Utf-8"));
        String line;
        StringBuilder buffer = new StringBuilder();
        while ((line = br.readLine()) != null) {
            buffer.append(line);
        }
        resp.getWriter().write(buffer.toString());


    }
}
