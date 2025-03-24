/**
 * Statistics related to Mercado Libre products
 */
export interface MLStats {
    /** Total number of products published by the seller */
    totalProducts: number
    /** Number of active products */
    activeProducts: number
  }
  
  /**
   * Statistics related to products in the database
   */
  export interface ProductStats {
    /** Total number of products in the database */
    totalProducts: number
    /** Number of products added in the last 30 days */
    countRecentProducts: number
  }
  
  /**
   * Statistics related to users
   */
  export interface UserStats {
    /** Total number of registered users */
    totalUsers: number
    /** Number of users active in the last 30 days */
    activeUsers: number
  }
  
  /**
   * Complete statistics response containing all metrics
   */
  export interface StatisticsResponse {
    /** Mercado Libre related statistics */
    mercadoLibre: MLStats
    /** Product database statistics */
    products: ProductStats
    /** User statistics */
    users: UserStats
    /** Timestamp when the statistics were generated */
    timestamp: string
  }  