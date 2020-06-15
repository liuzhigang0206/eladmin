package me.zhengjie.modules.intercept;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

/**
 * @Description:
 * @Author laoxu
 * @Date 2019/11/3 13:45
 **/
@Component
public class GlobalInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpServletResponseWrapper httpResponse = new HttpServletResponseWrapper((HttpServletResponse) response);
        System.out.println(request.getRequestURI());
        String path = request.getRequestURI();
        if (path.indexOf("/traffic") > -1) {
            path = path.replaceAll("/traffic", "");
            System.err.println(path);
            request.getRequestDispatcher(path).forward(request, response);
        }

        return true;
    }
}