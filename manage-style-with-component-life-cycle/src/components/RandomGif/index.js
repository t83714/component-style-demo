import React from "react";
import PropTypes from "prop-types";
import {
    ComponentManager,
    AppContainerContext,
    AppContainer
} from "fractal-component";

import reducer from "./reducers";
import saga from "./sagas";
import * as actions from "./actions";
import * as actionTypes from "./actions/types";
import partialRight from "lodash/partialRight";
import jss from "jss";
import jssDefaultPreset from "jss-preset-default";
import styles from "./styles";

class RandomGif extends React.Component {
    constructor(props) {
        super(props);
        /**
         * You can set initState via ManageableComponentOptions.initState options as well.
         * this.state gets higher priority
         */
        this.state = {
            isLoading: false,
            imageUrl: null,
            error: null
        };

        this.componentManager = new ComponentManager(this, {
            namespace: "io.github.t83714/RandomGif",
            reducer: reducer,
            saga: partialRight(saga, props.apiKey),
            actionTypes,
            allowedIncomingMulticastActionTypes: [actionTypes.REQUEST_NEW_GIF]
        });

        this.styleSheet = jss
            .setup(jssDefaultPreset())
            .createStyleSheet(styles, {
                generateClassName: this.componentManager.createClassNameGenerator()
            })
            .attach();
    }

    componentWillUnmount() {
        if (this.styleSheet) {
            this.styleSheet.detach();
        }
    }

    render() {
        const { styleSheet } = this.componentManager.getNamespaceData();
        const { classes } = this.styleSheet;
        return (
            <div className={classes.table}>
                <div className={classes.cell}>RandomGif</div>
                <div
                    className={`${classes.cell} ${classes["image-container"]}`}
                >
                    {this.state.imageUrl &&
                        !this.state.isLoading &&
                        !this.state.error && (
                            <img
                                alt="Gif"
                                src={this.state.imageUrl}
                                className={`${classes.image}`}
                            />
                        )}
                    {(!this.state.imageUrl || this.state.isLoading) &&
                        !this.state.error && (
                            <p>
                                {this.state.isLoading
                                    ? "Requesting API..."
                                    : "No GIF loaded yet!"}
                            </p>
                        )}
                    {this.state.error && (
                        <p>{`Failed to request API: ${this.state.error}`}</p>
                    )}
                </div>
                {this.props.showButton && (
                    <div className={`${classes.cell} `}>
                        <button
                            onClick={() => {
                                this.componentManager.dispatch(
                                    actions.requestNewGif()
                                );
                            }}
                            disabled={this.state.isLoading}
                        >
                            {this.state.isLoading
                                ? "Requesting API..."
                                : "Get Gif"}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

RandomGif.propTypes = {
    showButton: PropTypes.bool,
    apiKey: PropTypes.string,
    styles: PropTypes.object,
    appContainer: PropTypes.instanceOf(AppContainer)
};

RandomGif.defaultProps = {
    showButton: true,
    apiKey: "Y4P38sTJAgEBOHP1B3sVs0Jtk01tb6fA"
};

// --- Define contentType allow `AppContainer` pass through React Context
RandomGif.contextType = AppContainerContext;

export default RandomGif;

//--- actions component may send out
const exposedActionTypes = {
    NEW_GIF: actionTypes.NEW_GIF,
    LOADING_START: actionTypes.LOADING_START,
    LOADING_COMPLETE: actionTypes.LOADING_COMPLETE,
    REQUEST_NEW_GIF: actionTypes.REQUEST_NEW_GIF
};
//--- action component will accept
const exposedActions = {
    requestNewGif: actions.requestNewGif
};

/**
 * expose actions for component users
 */
export { exposedActionTypes as actionTypes, exposedActions as actions };
