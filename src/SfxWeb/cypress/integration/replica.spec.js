/// <reference types="cypress" />

import { addDefaultFixtures, apiUrl, addRoute} from './util';

const appName = "VisualObjectsApplicationType";

/*
Default to stateful service for the page
*/
context('replica', () => {
    beforeEach(() => {
        addDefaultFixtures();
        addRoute("services", "app-page/services", apiUrl(`/Applications/${appName}/$/GetServices?`))
    })

    describe("stateful", () => {
        const serviceName = "VisualObjects.ActorService";
        const partitionId = "28bfaf73-37b0-467d-9d47-d011b0aedbc0";
        const replicaId = "132429154475414363";
        const waitRequest = "@getreplicaInfo";

        beforeEach(() => {
            cy.server();
            // cy.route(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions?*`), "fx:replica-page/stateful-service-partitions").as("partitions");

            // addRoute("partitions", "replica-page/stateful-service-partitions.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions?`))
            addRoute("partitionInfo", "replica-page/stateful-partition-info.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}?*`))
            addRoute("replicasList", "replica-page/stateful-replicas-list.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas?*`))
            addRoute("replicaInfo", "replica-page/stateful-replica-info.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}?*`))
            addRoute("replicaHealth", "replica-page/health.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}/$/GetHealth?*`))
            addRoute("details", "replica-page/stateful-replica-detail.json", apiUrl(`/Nodes/_nt_1/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}/$/GetDetail?*`))

            cy.intercept('GET', apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions?*`), {fixture:"replica-page/stateful-service-partitions.json" }).as("partitions");
            // cy.intercept(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}?*`), "fx:replica-page/stateful-partition-info").as("partitionInfo");
            // cy.intercept(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas?*`), "fx:replica-page/stateful-replicas-list").as("replicasList");
            // cy.intercept(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}?*`), "fx:replica-page/stateful-replica-info").as("replicaInfo");
            // cy.intercept(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}/$/GetHealth?*`), "fx:replica-page/health").as("replicaHealth");
            // cy.intercept(apiUrl(`/Nodes/_nt_1/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}/$/GetDetail?*`), "fx:replica-page/stateful-replica-detail").as("details");

            cy.visit(`/#/apptype/${appName}/app/${appName}/service/${appName}%252F${serviceName}/partition/${partitionId}/replica/${replicaId}`)
        })

        it.only('load essentials', () => {
            cy.wait(waitRequest);

            cy.get('[data-cy=header]').within(() => {
                cy.contains(replicaId);
                cy.contains("Replica");
            })
        })

        it('view details', () => {
            cy.wait(waitRequest);

            cy.get('[data-cy=navtabs]').within(() => {
                cy.contains('details').click();
            })

            cy.url().should('include', '/details')
        })


        it('view events', () => {
            cy.intercept(apiUrl(`*/$/Events?*`), "fx:empty-list").as("events")

            cy.wait(waitRequest);

            cy.get('[data-cy=navtabs]').within(() => {
                cy.contains('events').click();
            })

            cy.url().should('include', '/events')
        })
    })

    describe("stateful", () => {
        const serviceName = "VisualObjects.WebService";
        const partitionId = "18efefc0-c136-4ba4-b1ec-d075704e412b";
        const replicaId = "132429339499004157";
        const waitRequest = "@getreplicaInfo";

        beforeEach(() => {

            addRoute("partitions", "replica-page/stateless-service-partitions.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions?*`))
            addRoute("partitionInfo", "replica-page/stateless-service-partitions.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}?*`))
            addRoute("replicasList", "replica-page/stateless-replicas-list.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas?*`))
            addRoute("replicaInfo", "replica-page/stateless-replica-info.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}?*`))
            addRoute("replicaHealth", "replica-page/health.json", apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}/$/GetHealth?*`))
            addRoute("details", "replica-page/stateless-replica-detail.json", apiUrl(`/Nodes/_nt_3/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}/$/GetDetail?*`))
            // cy.intercept(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions?*`), "fx:replica-page/stateless-service-partitions").as("partitions");
            // cy.intercept(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}?*`), "fx:replica-page/stateless-partition-info").as("partitionInfo");
            // cy.intercept(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas?*`), "fx:replica-page/stateless-replicas-list").as("replicasList");
            // cy.intercept(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}?*`), "fx:replica-page/stateless-replica-info").as("replicaInfo");
            // cy.intercept(apiUrl(`/Applications/${appName}/$/GetServices/${appName}/${serviceName}/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}/$/GetHealth?*`), "fx:replica-page/health").as("replicaHealth");
            // cy.intercept(apiUrl(`/Nodes/_nt_3/$/GetPartitions/${partitionId}/$/GetReplicas/${replicaId}/$/GetDetail?*`), "fx:replica-page/stateless-replica-detail").as("details");
        })

        it('load essentials', () => {
            cy.visit(`/#/apptype/${appName}/app/${appName}/service/${appName}%252F${serviceName}/partition/${partitionId}/replica/${replicaId}`)
            cy.wait(waitRequest);

            cy.get('[data-cy=header]').within(() => {
                cy.contains(replicaId);
                cy.contains("Instance");
            })

            cy.get('[data-cy=address]').within(() => {
                cy.contains('http://10.0.0.7:8081/visualobjects/');
                cy.contains('http://10.0.0.7:8081/visualobjects/data/');
            })
        })
    })
})