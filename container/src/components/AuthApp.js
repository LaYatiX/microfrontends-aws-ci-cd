import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate({ pathname }) {
                if (history.location.pathname != pathname)
                    history.push(pathname)
            },
            initialPath: history.location.pathname,
            onSignIn
        })

        history.listen(onParentNavigate)

    }, [])

    return <div ref={ref}></div>
} 