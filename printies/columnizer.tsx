import * as React from 'react';

export interface ColumnizerProps {
    columns: number;
}
export class Columnizer extends React.Component<ColumnizerProps> {
    render() {
        const { children, columns } = this.props;
        return <div style={{ columnCount: columns }}>{children}</div>
    }
}